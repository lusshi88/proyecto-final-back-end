const Product = require("../schemas/productsSchemas.js");

//datos de los productos.json
const carsData = require("../data/productos.json");

//modelo de los productos 
const productsModel = require("../models/productsModel.js");

// función para insertar los productos
async function createProducts (req,res){
  try {
    let result = await productsModel.create(carsData)
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

    const {
      docs,
      totalDocs,
      limit: limitPag,
      totalPages,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      prevLink,
    } = await productsModel.paginate({}, { page, limit })

    // let cars = await productsModel.find({})
    //con el sort 1, ordeno el precio de menor a mayor
    // .sort({price :1})
    return res.status(200).json({
      message:"cars list",
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      length: totalDocs,
    limit: limitPag
    })
 
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
    const product = await productsModel.findById(pid);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
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
    let carsLowerPrice;
    if  (queryPrice){
    const prices = parseFloat(queryPrice);
    carsLowerPrice = await productsModel.find({
      price : { $lte: prices}
      
    })
    //ademas le pongo un ordenamiento de precios (de menor a mayor )
    .sort({price :1})
  } else{
    //si no pone nada como query, trae los 10 productos
    carsLowerPrice = await productsModel.find({}).limit(10);
  }
  return res.status(202).json({
    message:"cars lower price list",
    carsLowerPrice,
    // arreglo para saber cuantos productos en total trajo la filtración
    carsLowerPriceCount: carsLowerPrice.length
    })
 
} catch (error) {
  console.log(error);
}
};


// función para traer el producto más barato (implemento el limit)
async function getProductsCheaper (req,res){
  try {
    const {limitQuery} = req.query;
    const limitt = parseFloat(limitQuery);
    let carsCheaper = await productsModel.find({})
    .sort ({price: 1}).limit(limitt)
    return res.status(202).json({
      message:"Cheapest product",
      carsCheaper,
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

    const product = await productsModel.findById(pid);
    if (!product) {
      return res.status(404).json({ message: "El producto no existe" });
    }
    
    const { title, price, description } = req.body;
    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;

    await product.save();
    return res.status(200).json({ message: "Producto actualizado", product });


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
    const product = await productsModel.findById(pid);
    if (!product) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    await productsModel.findByIdAndDelete(pid);
    return res.status(200).json({ message: "Producto eliminado correctamente" });
    
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
