const nodemailer = require("nodemailer");

async function send(email,message,subject = false){

  try {
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "b5c71ad7c334f5",
        pass: "da646f29dd4bf6"
      }
    });

    let info = await transport.sendMail({
      from: 'alvarovisiont@gmail.com',
      to: email,
      subject: subject ? subject  : "Mensaje del sistema",
      html: message,
    });
    return true
  } catch (e) {
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return false
  }

}

module.exports = {
  send
}
