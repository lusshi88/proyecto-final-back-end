const Product = require("../schemas/productsSchemas.js");

//datos de los productos.json
const carsData = require("../data/productos.json");

//modelo de los productos 
const productsModel = require("../models/productsModel.js");

// Inserto los productos
async function PostProductsInsert (req,res){
  try {
    let result = await productsModel.find (carsData).populate("")
  console.log(result);
  return res.status(200).json({
    message: "insert exitoso",
    carts: result,
  })
} catch (error) {
  console.log(error);
}
};

// Obtengo todos los productos insertados
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

// codigo para buscar por query ,el precio menor de los productos
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


// Traigo el producto más barato de todos (implemento el limit para esto :) )
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



module.exports = {
  PostProductsInsert,
  getProducts,
  getProductsLowerPrice,
  getProductsCheaper
 
};
