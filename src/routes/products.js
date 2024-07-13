const express = require('express');
const productsController = require('../controllers/productsControllers.js');
const handlePolicies = require('../middleware/handle-policies.middleware');

const router = express.Router();

//Ruta para insertar los productos (requiere rol ADMIN)
router.post('/',handlePolicies(["ADMIN"]), productsController.createProducts);

//Ruta para obtener todos los productos (requiere rol ADMIN o USER)
router.get('/', handlePolicies(["ADMIN","USER"]),productsController.getProducts);

//Ruta para buscar un producto por su ID (requiere rol ADMIN o USER)
router.get('/:pid', handlePolicies(["ADMIN","USER"]),productsController.getProductsById );

//Ruta para buscar el producto de menor a mayor precio (requiere rol PUBLIC, USER o ADMIN)
router.get('/lowerprice',handlePolicies(["PUBLIC","USER","ADMIN"]), productsController.getProductsLowerPrice);

//Ruta para buscar el producto de menor a mayor precio (requiere rol PUBLIC, USER o ADMIN)
router.get('/cheaper',handlePolicies(["PUBLIC","USER","ADMIN"]), productsController.getProductsCheaper);

// Ruta para tomar un producto y actualizarlo (requiere rol ADMIN)
router.put ('/:pid',handlePolicies(["ADMIN"]), productsController.updateProduct);

//ruta para eliminar un producto (requiere rol ADMIN)
router.delete ('/:pid',handlePolicies(["ADMIN"]), productsController.deleteProduct);
module.exports = router;


