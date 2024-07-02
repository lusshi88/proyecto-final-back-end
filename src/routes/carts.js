const express = require('express');

const cartControllers = require('../controllers/cartsControllers.js');

const router = express.Router();



//ruta para crear el carrito nuevo
router.post('/', cartControllers.createCart);

//ruta para buscar un carrito por su ID y que muestre los productos en el
router.get('/:cid', cartControllers.cartByIdProducts); 

//busca el id del carrito y le agrega un producto
router.post('/:cid/product/:pid',cartControllers.addToCart);

//ruta para eliminar un producto del carrito seleccionado
router.delete('/:cid/products/:pid',cartControllers.removeFromCart);
    
//ruta para actualizar los productos del carrito seleccionado
router.put('/:cid',cartControllers.updatedCart)

//ruta para actualizar solo la cantidad del producto , del carrito seleccionado
router.put('/:cid/products/:pid',cartControllers.productQuantity);

//busco el id del carrito, y borro todo lo que tiene adentro 
router.delete('/:cid', cartControllers.removeAllFromCart);

//ruta para finalizar la compra
router.post('/:cid/purchase',cartControllers.purchaseCart);




module.exports = router;