const express = require('express');
const { check } = require("express-validator");
const { verifyToken } = require('../middleware');

const authController = require('../controllers/auth');
const carrierController = require('../controllers/carrier');
const carrierAddressController = require("../controllers/carrierAdresses")
const categoriesController = require('../controllers/categories');

const productController = require('../controllers/product');
const productCategoriesController = require('../controllers/productCategories');
const productGalerryController = require('../controllers/productGallery');

const profileController = require('../controllers/profile');
const userController = require('../controllers/user');
const userAddressController = require('../controllers/userAdress');

const inventariesControler = require("../controllers/inventaries");

const router  = express.Router();


router.post('/login',authController.login)
router.post('/auth_recovery_pass',authController.recover_password)

router.get('/inventaries',inventariesControler.get)
router.post('/inventaries',[
  verifyToken,
  check("product_id","is required").not().isEmpty(),
  check("user_id","is required").not().isEmpty(),
  check("day","is required").not().isEmpty(),
  check("time_init","is required").not().isEmpty(),
  check("time_final","is required").not().isEmpty(),
],inventariesControler.create)
router.put('/inventaries/:id',[verifyToken],inventariesControler.update)
router.delete('/inventaries/:id',[verifyToken],inventariesControler.destroy)

router.get('/categories',categoriesController.get)
router.post('/categories',[
  verifyToken,
  check("name","the name is required").not().isEmpty(),
],categoriesController.create)
router.put('/categories/:id',[verifyToken],categoriesController.update)
router.delete('/categories/:id',[verifyToken],categoriesController.destroy)

router.get('/carrier',[verifyToken],carrierController.get)
router.post('/carrier',[verifyToken],carrierController.create)
router.put('/carrier/:id',[verifyToken],carrierController.update)
router.delete('/carrier/:id',[verifyToken],carrierController.destroy)

router.post('/carrier-addresses',[
  verifyToken,
  check("carrier_id","the carrier_id is required").not().isEmpty(),
  check("latitude","the latitude is required").not().isEmpty(),
  check("longitude","the longitude is required").not().isEmpty(),
  check("address","the address is required").not().isEmpty(),

],carrierAddressController.create)
router.put('/carrier-addresses/:id',[verifyToken],carrierAddressController.update)
router.delete('/carrier-addresses/:id',[verifyToken],carrierAddressController.destroy)

router.get('/products',productController.get)
router.post('/products',[
  verifyToken,
  check("name","the name is required").not().isEmpty(),
  check("price","the price is required").not().isEmpty(),
  check("description","the description is required").not().isEmpty(),
  check("time_for_preparation","the time_for_preparation is required").not().isEmpty(),
],productController.create)
router.put('/products/:id',[verifyToken],productController.update)
router.delete('/products/:id',[verifyToken],productController.destroy)

router.post('/product-categories',[
  verifyToken,
  check("product_id","the product_id is required").not().isEmpty(),
  check("categories","the categories is required").not().isEmpty(),
],productCategoriesController.create)


router.post('/product-galleries',[
  verifyToken,
  check("product_id","the product_id is required").not().isEmpty(),
],productGalerryController.create)
router.put('/product-galleries/:id',[verifyToken],productGalerryController.update)
router.delete('/product-galleries/:id',[verifyToken],productGalerryController.destroy)


router.get('/profile',[verifyToken],profileController.get)
router.post('/profile',[
  verifyToken,
  check("name","the name is required").not().isEmpty(),
  check("last_name","the last_name is required").not().isEmpty(), 
  check("email","the email is required").not().isEmpty(),
],profileController.create)
router.put('/profile',[verifyToken],profileController.update)

router.get('/users',[verifyToken],userController.get)
router.post('/users',[
  check("rut","the rut is required").not().isEmpty(),
  check("role","the role is required").not().isEmpty(),
  check("password","the password is required").not().isEmpty(),
],userController.create)
router.put('/users',[verifyToken],userController.update)
router.delete('/users',[verifyToken],userController.destroy)

router.get('/user-addresses',[verifyToken],userAddressController.get)
router.post('/user-addresses',[
  verifyToken,
  check("latitude","the latitude is required").not().isEmpty(),
  check("longitude","the longitude is required").not().isEmpty(),
  check("address","the address is required").not().isEmpty(),
  check("description","the description is required").not().isEmpty(),
  check("city","the city is required").not().isEmpty(),
],userAddressController.create)
router.put('/user-addresses/:id',[verifyToken],userAddressController.update)
router.delete('/user-addresses/:id',[verifyToken],userAddressController.destroy)

module.exports = router
