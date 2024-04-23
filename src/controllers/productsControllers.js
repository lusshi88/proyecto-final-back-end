const productService = require ("../services/productService.js");
const Product = require("../schemas/productsSchemas.js");

//datos de los productos.json
const carsData = require("../data/productos.json");

//modelo de los productos 
const productsModel = require("../models/productsModel.js");

// función para insertar los productos
async function createProducts (req,res){
  try {
    const result = await productService.createProductsService(carsData)
  console.log(result);
  return res.status(200).json({
    message: "insert exitoso",
    carts: result,
  })
} catch (error) {
  console.log(error);
  return res.status(500).json({message: "error del servidor"});
}
};

// función para traer todos los productos
async function getProducts (req,res){
  try {
    const { page = 1, limit = 10 } = req.query;
    const productsData = await productService.getProductsService(page,limit);

    return res.status(200).json({
      message: "Cars list",
      payload: productsData.docs,
      totalPages: productsData.totalPages,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage,
      page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevLink: productsData.prevLink,
      length: productsData.totalDocs,
      limit: productsData.limit,
    });
 
} catch (error) {
  console.log(error);
}
};


//función para buscar productos por su ID
async function getProductsById (req,res) {
  try {
    const {pid} = req.params;
    if (!pid) {
      return res.status(400).json({ message: "ID de producto no proporcionado" });
    }
    const product = await productService.getProductsByIdService(pid);
    return res.status(200).json({
      message: "producto encontrado", product})
      
    
    
  } catch (error) {
    return res.status(500).json({ message:"error del servidor" });
  }
};

// función para buscar por query ,el precio menor de los productos
async function getProductsLowerPrice (req,res){
  try {
    const {queryPrice} = req.query;
    const {carsLowerPriceCount,carsLowerPrice} = await productService.getProductsLowerPriceService(queryPrice);
  return res.status(200).json({
    message:"cars lower price list",
    carsLowerPriceCount,
    carsLowerPrice
    });
 
} catch (error) {
  return res.status(500).json({message:"error en el servidor al traer los productos"});
}
};


// función para traer el producto más barato (implemento el limit)
async function getProductsCheaper (req,res){
  try {
    const {limitQuery} = req.query;
    const limitt = parseFloat(limitQuery);
    const result = await productService.getProductsCheaperService(limitt);
    return res.status(202).json({
      message:"Cheapest product",
      result,
    })
 
} catch (error) {
  console.log(error);
}
};

//función para buscar un producto y actualizarlo 
async function updateProduct (req,res){
  try {
    const {pid} = req.params
    if (!pid) {
      return res.status(400).json({ message: "ID de producto no proporcionado" });
    }
    const { title, price, description } = req.body
    const result = await productService.updateProductService(pid,title, price, description);
    return res.status(200).json({ message: "Producto actualizado", result });

  } catch (error) {
    console.log("error al actualizar el producto", error);
    return res.status(500).json({ message:"error del servidor" });
  }
};

//función para eliminar un producto
async function deleteProduct (req,res) {
  try {
    const {pid} = req.params
    if (!pid) {
      return res.status(400).json({ message: "ID de producto no proporcionado" });
    }
    const result = await productService.deleteProductService(pid);

    return res.status(200).json({ message: "Producto eliminado correctamente",result });
    
  } catch (error) {
    console.log("No se pudo eliminar el producto", error);
    return res.status(500).json({ message:"No se pudo eliminar el producto" });
  }
};



module.exports = {
  createProducts,
  getProducts,
  getProductsLowerPrice,
  getProductsCheaper,
  getProductsById,
  updateProduct,
  deleteProduct
 
};
