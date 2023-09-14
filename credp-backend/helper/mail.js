require('dotenv').config();
const nodemailer = require('nodemailer');

const sendMail = async (email, subject, body, bcc = null, cc = null) => {
  let transporter;
  if (process.env.NODE_ENV === 'production') {
    const aws = require('aws-sdk');
    const ses = new aws.SES();

    transporter = nodemailer.createTransport({
      SES: ses,
    });
  } else if (process.env.NODE_ENV === 'development') {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      pool: true, // use pooled connection
      rateLimit: true, // enable to make sure we are limiting
      maxConnections: 1, // set limit to 1 connection only
      maxMessages: 3, // send 3 emails per second
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  const from = `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`;

  const mailOptions = {
    from,
    to: email,
    subject,
    html: body,
    bcc: bcc !== null ? bcc : null,
    cc: cc !== null ? cc : null,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('error sending email : ', error);
      } else {
        console.info(`${new Date()} Email sent: ${info.response}`);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { sendMail };
