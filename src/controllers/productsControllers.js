const Product = require("../schemas/productsSchemas.js");

const carsData = require("../data/productos.json");

const productsModel = require("../models/productsModel.js");

// Inserto los productos
async function getProductsInsert (req,res){
  try {
    let result = await productsModel.insertMany (carsData)
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
    let cars = await productsModel.find({})
    //con el sort 1, ordeno el precio de menor a mayor
    .sort({price :1})
    return res.status(200).json({
      message:"cars list",
      cars,
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





//   Encontra producto por ID

// async function getProductId(req, res) {
//   const productId = req.params.pid;

//   try {
//     const filePath = path.join(__dirname, "..", "data", "productos.json");
//     const productsData = await fs.readFile(filePath, "utf-8");
//     const products = JSON.parse(productsData);

//     const product = products.find((p) => p.id === productId);

//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ error: "Producto no encontrado" });
//     }
//   } catch (error) {
//     console.error("Error al obtener el producto:", error);
//   }
// }

// Agrega un nuevo producto

// async function postProduct(req, res) {
//   const newProductData = req.body;
//   try {
//     const filePath = path.join(__dirname, "..", "data", "productos.json");
//     const productsData = await fs.readFile(filePath, "utf-8");
//     const products = JSON.parse(productsData);

//     // genera un nuevo ID
//     const newProductId = Date.now().toString();

//     const newProduct = new Product(
//       newProductId,
//       newProductData.title,
//       newProductData.description,
//       newProductData.code,
//       newProductData.price,
//       newProductData.status,
//       newProductData.stock,
//       newProductData.category,
//       newProductData.thumbnails
//     );

//     products.push(newProduct);
//     await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    
    
  

//     res.status(200).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: "Error al agregar un nuevo producto" });
//   }
// }

// actualiza un producto
// async function putProduct(req, res) {
//   const productId = req.params.pid;
//   const updatedProductData = req.body;

//   try {
//     const filePath = path.join(__dirname, "..", "data", "productos.json");
//     const productsData = await fs.readFile(filePath, "utf-8");
//     const products = JSON.parse(productsData);

//     const updatedProductIndex = products.findIndex((p) => p.id == productId);

//     if (updatedProductIndex !== -1) {
//       const updatedProduct = new Product(
//         productId,
//         updatedProductData.title,
//         updatedProductData.description,
//         updatedProductData.code,
//         updatedProductData.price,
//         updatedProductData.status,
//         updatedProductData.stock,
//         updatedProductData.category,
//         updatedProductData.thumbnails
//       );

//       products[updatedProductIndex] = updatedProduct;
//       await fs.writeFile(filePath, JSON.stringify(products, null, 2));

//       res.status(200).json(updatedProduct);
//     } else {
//       res.status(404).json({ error: "Producto no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error al actualizar el producto" });
//   }
// }

//  borra un producto
// async function deleteProduct(req, res) {
//   const productId = req.params.pid;

//   try {
//     const filePath = path.join(__dirname, "..", "data", "productos.json");
//     const productsData = await fs.readFile(filePath, "utf-8");
//     let products = JSON.parse(productsData);

//     const updatedProducts = products.filter((p) => p.id !== productId);

//     await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

    


//     res.json({ message: "Producto eliminado exitosamente" });
//   } catch (error) {
//     res.status(500).json({ error: "Error al eliminar el producto" });
//   }
// }

module.exports = {
  getProductsInsert,
  getProducts,
  getProductsLowerPrice,
  getProductsCheaper
  // getProductId,
  // postProduct,
  // putProduct,
  // deleteProduct,
};
