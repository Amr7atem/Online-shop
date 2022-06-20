const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  // const transporter = nodemailer.createTransport({
  //   // host: process.env.EMAIL_HOST,
  //   // port: process.env.EMAIL_PORT,
  //   service: 'Outlook',
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  //   // Activate in gmail "Less secure app" Option
  // });
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define email options
  const mailOptions = {
    from: 'Amr Hatem',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
