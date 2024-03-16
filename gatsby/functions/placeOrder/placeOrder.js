const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
// const transport = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//     user: 'ian.renner@ethereal.email',
//     pass: 'T1MkferyMPgNbvpuU5',
//   },
// });

exports.handler = async (event, context) => {
  try {
    const info = await transport.sendMail({
      from: "Slick's Slices <slick@example.com>",
      to: 'orders@example.com',
      subject: 'New order!',
      html: '<p>Your new pizza order is here1111111111a!</p>',
      text: 'Your new pizza order is here!1111111',
    });
    console.log('info1: ', info);
    return {
      statusCode: 200,
      body: JSON.stringify(info),
    };
  } catch (error) {
    console.error('Error sending mail: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error sending mail',
        error: error.toString(),
      }),
    };
  }
};
