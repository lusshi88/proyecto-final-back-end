const express = require('express');

const cartControllers = require('../controllers/cartsControllers.js');

const router = express.Router();



//ruta para crear el carrito nuevo
router.post('/', cartControllers.createCart);

//ruta para buscar un carrito por su ID y que muestre los productos en el
router.get('/:cid', cartControllers.cartByIdProducts); 

//agrego un producto por su id , en el carrito tambien con su id
// router.put('/:cid/product/:pid', async (req, res) => {
//     const {cid,pid} = req.params
//     const cart = await cartControllers.addToCart(pid, cid)
//     console.log(cart);
//     res.status(200).json(cart)
// });

router.post('/:cid/product/:pid',cartControllers.addToCart);



//ruta para eliminar un producto del carrito seleccionado
router.delete('/:cid/products/:pid', async (req, res) => {
    const {cid,pid} = req.params
    const cart = await cartControllers.removeFromCart(pid, cid)
    res.status(200).json(cart)
});

//ruta para actualizar los productos del carrito seleccionado
router.put('/:cid',cartControllers.updatedCart)

//busco el id del carrito, y borro todo lo que tiene adentro 
router.delete('/:cid', async (req,res) => {
    const {cid} = req.params
    const cart = await cartControllers.removeAllFromCart(cid)
    res.status(200).json(cart)

});




module.exports = router;