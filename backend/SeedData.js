const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const User = require('./models/User');

dotenv.config();

const sampleEvents = [
  {
    title: 'Rock Concert 2025',
    description: 'Join us for an amazing night of rock music with top bands performing live!',
    category: 'concert',
    venue: {
      name: 'City Stadium',
      address: '123 Main Street',
      city: 'Baddi',
      capacity: 5000,
    },
    date: new Date('2025-12-15'),
    startTime: '7:00 PM',
    endTime: '11:00 PM',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    ticketTypes: [
      {
        name: 'General Admission',
        price: 500,
        quantity: 3000,
        sold: 0,
        benefits: ['Standing Area', 'Access to Food Stalls'],
      },
      {
        name: 'VIP',
        price: 1500,
        quantity: 500,
        sold: 0,
        benefits: ['Reserved Seating', 'Backstage Pass', 'Meet & Greet'],
      },
    ],
    status: 'upcoming',
    isActive: true,
  },
  {
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring industry leaders and innovators.',
    category: 'conference',
    venue: {
      name: 'Convention Center',
      address: '456 Tech Park',
      city: 'Baddi',
      capacity: 1000,
    },
    date: new Date('2025-11-20'),
    startTime: '9:00 AM',
    endTime: '6:00 PM',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    ticketTypes: [
      {
        name: 'Standard Pass',
        price: 2000,
        quantity: 700,
        sold: 0,
        benefits: ['Access to All Sessions', 'Lunch Included', 'Conference Kit'],
      },
      {
        name: 'Premium Pass',
        price: 5000,
        quantity: 300,
        sold: 0,
        benefits: ['VIP Lounge Access', 'Networking Dinner', 'All Standard Benefits'],
      },
    ],
    status: 'upcoming',
    isActive: true,
  },
  {
    title: 'Football Championship',
    description: 'Exciting football match between top teams. Don\'t miss the action!',
    category: 'sports',
    venue: {
      name: 'Sports Arena',
      address: '789 Stadium Road',
      city: 'Baddi',
      capacity: 8000,
    },
    date: new Date('2025-12-01'),
    startTime: '5:00 PM',
    endTime: '8:00 PM',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    ticketTypes: [
      {
        name: 'Regular Seating',
        price: 300,
        quantity: 6000,
        sold: 0,
        benefits: ['Stadium Entry', 'Seat in General Stand'],
      },
      {
        name: 'Premium Seating',
        price: 800,
        quantity: 2000,
        sold: 0,
        benefits: ['Best View', 'Complimentary Snacks', 'Premium Stand'],
      },
    ],
    status: 'upcoming',
    isActive: true,
  },
  {
    title: 'Comedy Night',
    description: 'Laugh your heart out with the funniest comedians in town!',
    category: 'theater',
    venue: {
      name: 'Laugh Club',
      address: '321 Entertainment Street',
      city: 'Baddi',
      capacity: 300,
    },
    date: new Date('2025-11-25'),
    startTime: '8:00 PM',
    endTime: '10:00 PM',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
    ticketTypes: [
      {
        name: 'General Entry',
        price: 400,
        quantity: 250,
        sold: 0,
        benefits: ['Entry to Show', 'Seating Arrangement'],
      },
      {
        name: 'Couple Special',
        price: 700,
        quantity: 50,
        sold: 0,
        benefits: ['Reserved Table', 'Complimentary Drinks'],
      },
    ],
    status: 'upcoming',
    isActive: true,
  },
  {
    title: 'Web Development Workshop',
    description: 'Learn modern web development with hands-on projects and expert guidance.',
    category: 'workshop',
    venue: {
      name: 'Tech Learning Center',
      address: '555 Education Lane',
      city: 'Baddi',
      capacity: 150,
    },
    date: new Date('2025-11-30'),
    startTime: '10:00 AM',
    endTime: '5:00 PM',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    ticketTypes: [
      {
        name: 'Workshop Pass',
        price: 1200,
        quantity: 150,
        sold: 0,
        benefits: ['Full Day Workshop', 'Lunch & Refreshments', 'Certificate', 'Course Materials'],
      },
    ],
    status: 'upcoming',
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Check if organizer exists, if not create one
    let organizer = await User.findOne({ role: 'organizer' });
    
    if (!organizer) {
      organizer = await User.create({
        name: 'Event Organizer',
        email: 'organizer@tickethub.com',
        phone: '9876543210',
        password: 'password123',
        role: 'organizer',
        isVerified: true,
      });
      console.log('✅ Organizer created');
    }

    // Clear existing events
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing events');

    // Add organizer ID to events
    const eventsWithOrganizer = sampleEvents.map(event => ({
      ...event,
      organizer: organizer._id,
    }));

    // Insert sample events
    await Event.insertMany(eventsWithOrganizer);
    console.log('✅ Sample events added successfully');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Database seeded with:');
    console.log(`   - ${sampleEvents.length} Events`);
    console.log(`   - 1 Organizer account`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
