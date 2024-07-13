const express = require('express');

const cartControllers = require('../controllers/cartsControllers.js');
const authenticate = require ('../middleware/authenticate.js');
const handlePolicies = require('../middleware/handle-policies.middleware'); 

const router = express.Router();



//ruta para crear el carrito nuevo
router.post('/',handlePolicies(['ADMIN']), cartControllers.createCart);

//ruta para buscar un carrito por su ID y que muestre los productos en el
router.get('/:cid',handlePolicies(['USER', 'ADMIN']), cartControllers.cartByIdProducts); 

//busca el id del carrito y le agrega un producto
router.post('/:cid/product/:pid',handlePolicies(['USER', 'ADMIN']),cartControllers.addToCart);

//ruta para eliminar un producto del carrito seleccionado
router.delete('/:cid/products/:pid',handlePolicies(['USER', 'ADMIN']),cartControllers.removeFromCart);
    
//ruta para actualizar los productos del carrito seleccionado
router.put('/:cid',handlePolicies(['USER', 'ADMIN']),cartControllers.updatedCart)

//ruta para actualizar solo la cantidad del producto , del carrito seleccionado
router.put('/:cid/products/:pid',handlePolicies(['USER', 'ADMIN']),cartControllers.productQuantity);

//busco el id del carrito, y borro todo lo que tiene adentro 
router.delete('/:cid',handlePolicies(['ADMIN']), cartControllers.removeAllFromCart);

//ruta para finalizar la compra
router.post('/:cid/purchase',authenticate, cartControllers.purchaseCart);




module.exports = router;