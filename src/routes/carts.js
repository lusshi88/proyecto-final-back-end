const express = require('express');
const productsController = require('../controllers/cartsControllers.js');

const router = express.Router();




router.post('/', productsController.createCart);

//agrego un producto por su id , en el carrito tambien con su id
router.put('/:cid/product/:pid', async (req, res) => {
    const {cid,pid} = req.params
    const cart = await productsController.addToCart(pid, cid)
    res.status(200).json(cart)
});

//busco un producto por su id y tambien con el id del carrito , para borrarlo
router.delete('/:cid/product/:pid', async (req, res) => {
    const {cid,pid} = req.params
    const cart = await productsController.removeFromCart(pid, cid)
    res.status(200).json(cart)
});





module.exports = router;