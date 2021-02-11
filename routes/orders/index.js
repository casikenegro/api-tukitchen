const express = require('express');
const { check } = require("express-validator");
const { verifyToken, isAdmin } = require('../../middleware');
const router  = express.Router();

const ordersController = require('../../controllers/orders');
router.get('/orders',[verifyToken],ordersController.get)
router.post('/orders',[
  verifyToken,
  check("name","the is required").not().isEmpty(),
  check("phone","the is required").not().isEmpty(),
  check("radio","the is required").not().isEmpty(),
  check("base_price","the is required").not().isEmpty(),
  check("extra_price","the is required").not().isEmpty(),
  check("extra_distance","the is required").not().isEmpty(),
],ordersController.create)
router.put('/orders/:id',[verifyToken],ordersController.update)
router.delete('/orders/:id',[verifyToken],ordersController.destroy)
module.exports = router;