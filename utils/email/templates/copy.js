const orderNotificationCopy = require("./order-notification/copy");
const passwordResetCopy = require("./password-reset/copy");
const welcomeCopy = require("./welcome/copy");
require('dotenv').config();

module.exports ={
  ...orderNotificationCopy,
  ...passwordResetCopy,
  ...welcomeCopy,
  product_name: "Voraz",
  address_1: "Ubicacion 2",
  address_2: "ubicacion 1",
<<<<<<< HEAD
  support_email: "contacto@Voraz.com",
=======
  support_email: "contacto@voraz.com",
>>>>>>> e19fa718c60f07c09a35503541559da028e57f65
  copyright: `© ${new Date().getFullYear()} Voraz. Todos los derechos reservados.`,
  logo: `${process.env.STATIC_URL}/logo@3x-bDh.png`

};
