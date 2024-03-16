const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}

// create a transport for nodemailer
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
exports.handler = async (event, context) => {
  // received data from frontend
  const body = JSON.parse(event.body);
  console.log(body);
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  let isValid = true;
  let invalidField = null;

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    // input: body = { email: '', name: '', order: '' }, field = 'email'
    // step-by-step evaluation: !body[field] => !body['email'] => !'' => true
    if (!body[field]) {
      isValid = false;
      invalidField = field;
      break;
    }
  }

  if (!isValid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops! You are missing the ${invalidField} field`,
      }),
    };
  }

  // send the email
  console.log('Start process send email');
  const sendEmailPromise = transport
    .sendMail({
      from: "Slick's Slices <slick@example.com>",
      to: 'orders@example.com',
      subject: 'New order!',
      html: generateOrderEmail({ order: body.order, total: body.total }),
      text: 'This is a test email',
    })
    .then((info) => {
      console.log('Email outputtt: ', info);
      console.log('Finish send email');
    })
    .catch((error) => {
      console.error('Error sending mail: ', error);
    });

  // return a response immediately
  const returnResponsePromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'Order received!' }),
      });
    }, 5000); // wait 5 seconds before returning a response
  });

  return Promise.race([sendEmailPromise, returnResponsePromise]);
};
