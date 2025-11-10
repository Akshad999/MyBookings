const express = require('express');
const router = express.Router();
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const generateQRCode = require('../Utils/generateQR');
const sendEmail = require('../Utils/sendEmail');
const { protect } = require('../middleware/auth');

// @route   POST /api/payment/create-checkout-session
// @desc    Create Stripe checkout session
// @access  Private
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const { eventId, ticketTypeIndex, quantity } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    const ticketType = event.ticketTypes[ticketTypeIndex];
    const availableTickets = ticketType.quantity - ticketType.sold;

    if (quantity > availableTickets) {
      return res.status(400).json({
        success: false,
        message: 'Not enough tickets available',
      });
    }

    const totalAmount = ticketType.price * quantity;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${event.title} - ${ticketType.name}`,
              description: event.description,
            },
            unit_amount: ticketType.price * 100, // Stripe expects amount in cents/paisa
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        eventId: eventId,
        ticketTypeIndex: ticketTypeIndex.toString(),
        quantity: quantity.toString(),
        userId: req.user.id,
        ticketTypeName: ticketType.name,
      },
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Create Checkout Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating checkout session',
    });
  }
});

// @route   POST /api/payment/webhook
// @desc    Handle Stripe webhook events
// @access  Public (but verified by Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await handleSuccessfulPayment(session);
  }

  res.json({ received: true });
});

// Handle successful payment
async function handleSuccessfulPayment(session) {
  try {
    const { eventId, ticketTypeIndex, quantity, userId, ticketTypeName } = session.metadata;

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);
    const ticketType = event.ticketTypes[parseInt(ticketTypeIndex)];

    // Update sold tickets
    event.ticketTypes[ticketTypeIndex].sold += parseInt(quantity);
    await event.save();

    // Create ticket with QR code
    const ticketData = {
      eventId: event._id,
      eventTitle: event.title,
      userName: user.name,
      userEmail: user.email,
      ticketType: ticketTypeName,
      quantity: quantity,
      date: event.date,
    };

    const qrCode = await generateQRCode(ticketData);

    const ticket = await Ticket.create({
      event: eventId,
      user: userId,
      ticketType: {
        name: ticketTypeName,
        price: ticketType.price,
      },
      quantity: parseInt(quantity),
      totalAmount: ticketType.price * parseInt(quantity),
      qrCode: qrCode,
      paymentStatus: 'completed',
      paymentId: session.payment_intent,
    });

    // Add ticket to user's bookings
    user.bookings.push(ticket._id);
    await user.save();

    // Send confirmation email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">🎉 Ticket Booking Confirmed!</h2>
        <p>Dear ${user.name},</p>
        <p>Your ticket booking has been confirmed. Here are your booking details:</p>
        
        <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
          <p><strong>Ticket Type:</strong> ${ticketTypeName}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Total Amount:</strong> ₹${ticket.totalAmount}</p>
          <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${event.startTime}</p>
          <p><strong>Venue:</strong> ${event.venue.name}, ${event.venue.address}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p><strong>Your QR Code:</strong></p>
          <img src="${qrCode}" alt="QR Code" style="width: 200px; height: 200px;" />
          <p style="color: #666; font-size: 12px;">Present this QR code at the venue for entry</p>
        </div>

        <p>Thank you for booking with us!</p>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: `Ticket Confirmation - ${event.title}`,
      html: emailHtml,
    });

  } catch (error) {
    console.error('Handle Payment Error:', error);
  }
}

// @route   GET /api/payment/verify-session
// @desc    Verify payment session
// @access  Private
router.get('/verify-session/:sessionId', protect, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying session',
    });
  }
});

module.exports = router;
