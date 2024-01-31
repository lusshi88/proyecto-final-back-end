const express = require('express');
const productsController = require('../controllers/productsControllers.js');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductId);
router.post('/', productsController.postProduct);
router.put('/:pid', productsController.putProduct);
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;