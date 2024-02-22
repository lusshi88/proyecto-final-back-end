const express = require('express');
const productsController = require('../controllers/productsControllers.js');

const router = express.Router();

router.get('/insertion', productsController.getProductsInsert);
router.get('/', productsController.getProducts);
router.get('/lowerprice', productsController.getProductsLowerPrice);
router.get('/cheaper', productsController.getProductsCheaper);

// router.get('/:pid', productsController.getProductId);
// router.post('/', productsController.postProduct);
// router.put('/:pid', productsController.putProduct);
// router.delete('/:pid', productsController.deleteProduct);

module.exports = router;