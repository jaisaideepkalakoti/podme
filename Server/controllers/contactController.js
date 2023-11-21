// contactController.js
const transporter = require('../nodemailerTransporter.js'); // Update the path

const sendContactMessage = async (req, res) => {
  try {
    // Your email sending logic using the transporter
    // For example:
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'recipient@example.com',
      subject: 'New Contact Message',
      text: 'This is a test message from your contact form.',
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { sendContactMessage };
