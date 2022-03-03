const sgMail = require('@sendgrid/mail');
require('dotenv').config();

async function sendWelcomeMail(mail){
    sgMail.setApiKey(process.env.twilioKey);
    const msg = {
      to: `${mail}`,
      from: 'f.mateucci@somoscatus.com.ar', // Use the email address or domain you verified above
      subject: 'Welcome to DisneyApi',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

     try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports={
    sendWelcomeMail
}