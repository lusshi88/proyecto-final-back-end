const express = require('express');

const router = express.Router();

const productsModel = require ('../models/productsModel.js');
const cartsModel = require('../models/cartModel.js');


//ruta para renderizar todos los productos
router.get ("/products",async (req, res) => {
      const {page = 1 } = req.params;
      const products = await productsModel.paginate ({}, {limit:100 ,page, lean: true},)
      res.render('products', { products: products.docs })
});


//ruta para renderizar los productos del carrito
router.get("/carts/:cid", async (req, res) => {
      const { cid } = req.params;
      try {
        const cart = await cartsModel.findOne({ _id: cid });
        console.log(cart);
        if (!cart) {
          return res.status(404).send("Carrito no encontrado");
        }
        
        // Obtener solo los productos que pertenecen al carrito específico
        const products = await productsModel.find({ cartId: cid });
      
    
        res.render('carts', { cart: cart, products: products });
      } catch (error) {
        console.error("Error al buscar el carrito:", error);
        res.status(500).send("Error del servidor al buscar el carrito");
      }
    });
        



module.exports = router;