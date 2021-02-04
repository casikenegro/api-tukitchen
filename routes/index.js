const express = require('express');
const { verifyToken } = require('../middleware');
const authController = require('../controllers/auth');
const carrierController = require('../controllers/carrier');
const categoryController = require('../controllers/category');
const couponController = require('../controllers/coupons');
const inventaryController = require('../controllers/inventary');
const paymentController = require('../controllers/payment');
const productController = require('../controllers/product');
const profileController = require('../controllers/profile');
const rolesController = require('../controllers/roles');
const userController = require('../controllers/user');
const router  = express.Router();

const { check } = require("express-validator");

router.post('/login',authController.login)
router.post('/auth_recovery_pass',authController.recover_password)

router.get('/category/:id?',[verifyToken],categoryController.get)
router.post('/category',[verifyToken],categoryController.create)
router.put('/category/:id',[verifyToken],categoryController.update)
router.delete('/category/:id',[verifyToken],categoryController.destroy)

router.get('/coupon/:id?',[verifyToken],couponController.get)
router.get('/coupon_veryfi/:code',[verifyToken],couponController.verifyToken)
router.post('/coupon',[verifyToken],couponController.create)
router.put('/coupon/:id',[verifyToken],couponController.update)
router.delete('/coupon/:id',[verifyToken],couponController.destroy)

router.get('/carrier/:id?',[verifyToken],carrierController.get)
router.post('/carrier',[verifyToken],carrierController.create)
router.put('/carrier/:id',[verifyToken],carrierController.update)
router.delete('/carrier/:id',[verifyToken],carrierController.destroy)

router.get('/inventary/:id?',[verifyToken],inventaryController.get)
router.put('/inventary/:id',[verifyToken],inventaryController.update)

router.get('/payment/:id?',[verifyToken],paymentController.get)
router.get('/payment_by_status/:status',[verifyToken],paymentController.getByStatus)
router.post('/payment',[verifyToken],paymentController.create)
router.put('/payment_change_status/:id',[verifyToken],paymentController.changeStatus)
//  router.get('/payment_confirmation_flow_url',paymentController.getConfirmationFlow)
router.post('/payment_confirmation_flow_url',paymentController.getConfirmationFlow)


router.get('/products',productController.get)
router.get('/product_by_pagination/:offset/:limit?',[verifyToken],productController.get_pagination)
router.get('/products_by_seller/:id',[verifyToken],productController.getBySeller)
router.get('/products_by_category/:id',[verifyToken],productController.getByCategory)
router.get('/products_premium',[verifyToken],productController.getPremium)
router.get('/products_by_word/:word',[verifyToken],productController.getByWord)
router.post('/product',[verifyToken],productController.create)
router.post('/product_by_filter',[verifyToken],productController.getProductsByFilter)
router.put('/product/:id',[verifyToken],productController.update)
router.put('/product_change_status/:id',[verifyToken],productController.updateStatus)
router.delete('/product/:id',[verifyToken],productController.destroy)
router.delete('/product_remove_img/:id/:filename',[verifyToken],productController.removeImgGallery)

router.get('/profile',[verifyToken],profileController.get)
router.post('/profile',[
  verifyToken,
  check("name","the name is required").not().isEmpty(),
  check("last_name","the last_name is required").not().isEmpty(), 
  check("email","the email is required").not().isEmpty(),
],profileController.create)

router.put('/profile',[verifyToken],profileController.update)

router.get('/roles',[verifyToken],rolesController.get)

router.get('/users',[verifyToken],userController.get)
router.post('/users',[
  check("rut","the rut is required").not().isEmpty(),
  check("password","the password is required").not().isEmpty()
],userController.create)
router.put('/users',[verifyToken],userController.update)
router.delete('/users',[verifyToken],userController.destroy)
router.get('/user_sellers',userController.get_sellers)


router.get('/users-addresses',[verifyToken],userController.get)
router.post('/users-addresses/:id',[
  check("latitude","the latitude is required").not().isEmpty(),
  check("longitude","the longitude is required").not().isEmpty(),
  check("address","the address is required").not().isEmpty(),
  check("description","the description is required").not().isEmpty(),
  check("city","the city is required").not().isEmpty(),
],userController.create)
router.put('/users-addresses/:id',[verifyToken],userController.update)
router.delete('/users-addresses/:id',[verifyToken],userController.destroy)

module.exports = router
