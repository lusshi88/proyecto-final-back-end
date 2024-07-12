const productService = require ("../services/productService.js");
const Product = require("../schemas/productsSchemas.js");

//datos de los productos.json
const carsData = require("../data/productos.json");

// función para insertar los productos
async function createProducts (req,res){
  try {
    req.logger.info('Insertando productos');
    const result = await productService.createProductsService(carsData)
    req.logger.info('Productos insertados correctamente:', result);
  return res.status(200).json({
    message: "insert exitoso",
    carts: result,
  })
} catch (error) {
  req.logger.error(`Error al insertar productos: ${error}`);
  return res.status(500).json({message: "error del servidor"});
}
};

// función para traer todos los productos
async function getProducts (req,res){
  try {
    req.logger.info('Obteniendo lista de productos');
    const { page = 1, limit = 10 } = req.query;
    const productsData = await productService.getProductsService(page,limit);
    req.logger.info(`Productos obtenidos. Página: ${page}, Límite: ${limit}`);

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
  req.logger.error(`Error al obtener la lista de productos: ${error}`);
  return res.status(500).json({ message: "error del servidor" });
}
};


//función para buscar productos por su ID
async function getProductsById (req,res) {
  try {
    const {pid} = req.params;
    req.logger.info(`Buscando producto por ID: ${pid}`);
    if (!pid) {
      return res.status(400).json({ message: "ID de producto no proporcionado" });
    }
    const product = await productService.getProductsByIdService(pid);
    req.logger.info(`Producto encontrado por ID ${pid}: ${product}`);
    return res.status(200).json({
      message: "producto encontrado", product})
      
    
    
  } catch (error) {
    req.logger.error(`Error al buscar producto por ID: ${error}`);
    return res.status(500).json({ message:"error del servidor" });
  }
};

// función para buscar por query ,el precio menor de los productos
async function getProductsLowerPrice (req,res){
  try {
    const {queryPrice} = req.query;
    req.logger.info(`Buscando productos con precio menor a: ${queryPrice}`);
    if (!queryPrice) {
      return res.status(400).json({ message: "Precio no proporcionado" });
    }
    const {carsLowerPriceCount,carsLowerPrice} = await productService.getProductsLowerPriceService(queryPrice);
    req.logger.info(`Productos encontrados con precio menor a ${queryPrice}: ${carsLowerPrice}`);
  return res.status(200).json({
    message:"cars lower price list",
    carsLowerPriceCount,
    carsLowerPrice
    });
 
} catch (error) {
  req.logger.error(`Error al obtener productos con precio menor: ${error}`);
  return res.status(500).json({message:"error en el servidor al traer los productos"});
}
};


// función para traer el producto más barato (implemento el limit)
async function getProductsCheaper (req,res){
  try {
    const {limitQuery} = req.query;
    req.logger.info(`Buscando el producto más barato con límite ${limitQuery}`);
    if (!limitQuery) {
      return res.status(400).json({ message: "Limite no proporcionado" });
    }
    const limitt = parseFloat(limitQuery);
    if (isNaN(limitt) || limitt <= 0) {
      return res.status(400).json({ message: "El parámetro de límite debe ser un número positivo" })};
  
    const result = await productService.getProductsCheaperService(limitt);
    req.logger.info(`Producto más barato encontrado: ${result}`);
    return res.status(202).json({
      message:"Cheapest product",
      result,
    })
 
} catch (error) {
  req.logger.error(`Error al obtener el producto más barato: ${error}`);
  return res.status(500).json({ message:"error en el servidor al traer los productos más baratos"});
}
};

//función para buscar un producto y actualizarlo 
async function updateProduct (req,res){
  try {
    const {pid} = req.params
    req.logger.info(`Actualizando producto con ID: ${pid}`);
    if (!pid) {
      return res.status(400).json({ message: "ID de producto no proporcionado" });
    }
    const { title, price, description } = req.body
    if (!title) {
      return res.status(400).json({ message: "Título no proporcionado" });
    };
    if (!price) {
      return res.status(400).json({ message: "Precio no proporcionado" });
    };
    if (!description) {
      return res.status(400).json({ message: "Descripción no proporcionada" });
    };
    const result = await productService.updateProductService(pid,title, price, description);
    req.logger.info(`Producto actualizado con ID ${pid}: ${result}`)
    return res.status(200).json({ message: "Producto actualizado", result });

  } catch (error) {
    req.logger.error(`Error al actualizar producto: ${error}`);
    return res.status(500).json({ message:"error del servidor" });
  }
};

//función para eliminar un producto
async function deleteProduct (req,res) {
  try {
    const {pid} = req.params
    req.logger.info(`Eliminando producto con ID: ${pid}`);
    if (!pid) {
      return res.status(400).json({ message: "ID de producto no proporcionado" });
    }
    const result = await productService.deleteProductService(pid);
    req.logger.info(`Producto eliminado con ID ${pid}`);

    return res.status(200).json({ message: "Producto eliminado correctamente",result });
    
  } catch (error) {
    req.logger.error(`Error al eliminar producto: ${error}`);
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
