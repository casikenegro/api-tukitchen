const express = require('express');
const { check } = require("express-validator");
const { verifyToken, isAdmin } = require('../../middleware');
const router  = express.Router();
const cuponsController = require("../../controllers/cupons");

router.get('/cupons',[verifyToken],cuponsController.get)
router.get('/is-cupon-valid/:id',[verifyToken],cuponsController.isCouponValid)

router.post('/cupons',[
  verifyToken,
  check("discount","is required").not().isEmpty(),
],cuponsController.create)
router.post('/create-cupons-by-admin/:user_id',[
  verifyToken,
  isAdmin,
  check("discount","is required").not().isEmpty(),
  check("name","is required").not().isEmpty(),
],cuponsController.createByAdmin)
router.put('/cupons/:id',[verifyToken],cuponsController.update)
router.delete('/cupons/:id',[verifyToken],cuponsController.destroy)
module.exports = router
