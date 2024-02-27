const express = require('express');
const productsController = require('../controllers/productsControllers.js');

const router = express.Router();

router.post('/insertion', productsController.PostProductsInsert);
router.get('/', productsController.getProducts);
router.get('/lowerprice', productsController.getProductsLowerPrice);
router.get('/cheaper', productsController.getProductsCheaper);


module.exports = router;