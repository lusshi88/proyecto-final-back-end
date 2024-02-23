const express = require('express');
const productsController = require('../controllers/cartsControllers.js');

const router = express.Router();




router.post('/', productsController.createCart);
router.post('/addtocart', productsController.addToCart);
// router.get('/:cid/products/:pid', productsController.getCarInsert);
// router.put('/:cid', productsController.getCarInsert);
// router.put('/:cid/products/:pid', productsController.getCarInsert);
// router.delete('/:cid', productsController.getCarInsert);


// router.get('/', productsController.postCart);
// router.get('/:cid', productsController.getCartId);


module.exports = router;