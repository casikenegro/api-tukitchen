const orderNotificationCopy = require("./order-notification/copy");
const passwordResetCopy = require("./password-reset/copy");
const welcomeCopy = require("./welcome/copy");

module.exports ={
  ...orderNotificationCopy,
  ...passwordResetCopy,
  ...welcomeCopy,
  product_name: "Borage",
  address_1: "Ubicacion 2",
  address_2: "ubicacion 1",
  support_email: "contacto@borage.com",
  copyright: `© ${new Date().getFullYear()} Voraz. Todos los derechos reservados.`,
};
