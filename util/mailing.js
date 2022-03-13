const sgMail = require('@sendgrid/mail');
require('dotenv').config();

async function sendWelcomeMail(mail){
    sgMail.setApiKey(process.env.twilioKey);
    
    const msg = {
      to: `${mail}`,
      from: 'federicomateucci@gmail.com', // Use the email address or domain you verified above
      subject: 'Welcome to DisneyApi',
      text: 'Hola Bienvenido a DisneyApi by Federico Mateucci, para tener acceso a todos los endpoints, deberas loguearte para obtener un Token y luego pegarlo en todos los endpoints Como Bearer Token en postman',
      html: `<strong>Bienvenido ${mail}</strong>`,
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