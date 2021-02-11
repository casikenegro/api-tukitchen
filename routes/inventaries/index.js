const express = require('express');
const { check } = require("express-validator");
const { verifyToken, isAdmin } = require('../../middleware');
const router  = express.Router();

const inventariesControler = require("../../controllers/inventaries");


router.get('/inventaries',[
  verifyToken,
],inventariesControler.get);
router.get('/sell-in-week',inventariesControler.sellInWeek);

router.post('/inventaries',[
  verifyToken,
  check("product_id","is required").not().isEmpty(),
  check("day","is required").not().isEmpty(),
  check("time_init","is required").not().isEmpty(),
  check("time_final","is required").not().isEmpty(),
],inventariesControler.create)
router.put('/inventaries/:id',[verifyToken],inventariesControler.update)
router.delete('/inventaries/:id',[verifyToken],inventariesControler.destroy)


module.exports = router
