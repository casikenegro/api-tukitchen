const orderNotificationCopy = require("./order-notification/copy");
const passwordResetCopy = require("./password-reset/copy");
const welcomeCopy = require("./welcome/copy");
require('dotenv').config();

module.exports ={
  ...orderNotificationCopy,
  ...passwordResetCopy,
  ...welcomeCopy,
  product_name: "Borage",
  address_1: "Ubicacion 2",
  address_2: "ubicacion 1",
  support_email: "contacto@borage.com",
  copyright: `© ${new Date().getFullYear()} Borage. Todos los derechos reservados.`,
  logo: `${process.env.STATIC_URL}/logo@3x-bDh.png`

};
