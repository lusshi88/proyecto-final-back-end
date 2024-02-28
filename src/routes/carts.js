const express = require('express');
const productsController = require('../controllers/cartsControllers.js');

const router = express.Router();



//ruta para crear el carrito nuevo
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

//busco el id del carrito, y borro todo lo que tiene adentro 
router.delete('/:cid', async (req,res) => {
    const {cid} = req.params
    const cart = await productsController.removeAllFromCart(cid)
    res.status(200).json(cart)

});




module.exports = router;