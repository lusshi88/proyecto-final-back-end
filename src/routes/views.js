const express = require('express');

const router = express.Router();

const productsModel = require ('../models/productsModel.js');


router.get ("/products",async (req, res) => {
      const {page = 1 } = req.params;
      const products = await productsModel.paginate ({}, {limit:10 ,page, lean: true},)
      res.render('products', { products: products.docs })
});


        



module.exports = router;