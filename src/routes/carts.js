const express = require('express');
const productsController = require('../controllers/cartsControllers.js');

const router = express.Router();

router.get('/', productsController.postCart);
router.get('/:cid', productsController.getCartId);


module.exports = router;