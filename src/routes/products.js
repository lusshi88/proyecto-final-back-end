const express = require('express');
const productsController = require('../controllers/productsControllers.js');

const router = express.Router();

//ruta para insertar los productos
router.post('/', productsController.createProducts);

//ruta para obtener todos los productos
router.get('/', productsController.getProducts);

//ruta para buscar un producto por su ID
 //router.get('/:pid', productsController.getProductsById );

//ruta para buscar el producto de menor a mayor precio
router.get('/lowerprice', productsController.getProductsLowerPrice);

//ruta para buscar el producto más barato
router.get('/cheaper', productsController.getProductsCheaper);

//ruta para tomar un producto y actualizarlo
router.put ('/:pid', productsController.updateProduct);

//ruta para eliminar un producto 
router.delete ('/:pid', productsController.deleteProduct);
module.exports = router;


