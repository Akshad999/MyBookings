const QRCode = require('qrcode');

const generateQRCode = async (data) => {
  try {
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(data), {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 300,
      margin: 1,
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR Code Generation Error:', error);
    throw error;
  }
};

module.exports = generateQRCode;
