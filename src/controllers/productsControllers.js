const fs = require("fs/promises");
const path = require("path");
const Product = require("../schemas/productsSchemas.js");
const {io} = require("../app.js");
const { log } = require("console");

// Obtengo todos los productos

async function getProducts(req, res) {
  try {
    console.log("Trayendo los productos");

    const filePath = path.join(__dirname, "..", "data", "productos.json");
    const productsData = await fs.readFile(filePath, "utf-8");

    const products = JSON.parse(productsData);

    if (products.length === 0) {
      console.log("No hay productos disponibles");

      res.status(404).json({ error: "No hay productos disponibles" });
    } else {
      console.log("Productos obtenidos correctamente:", products);
      res.status(200).json(products);
    }
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    res.status(500).json({ error: "Error al obtener la lista de productos" });
  }
}

//   Encontra producto por ID

async function getProductId(req, res) {
  const productId = req.params.pid;

  try {
    const filePath = path.join(__dirname, "..", "data", "productos.json");
    const productsData = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(productsData);

    const product = products.find((p) => p.id === productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }
}

// Agrega un nuevo producto

async function postProduct(req, res) {
  const newProductData = req.body;
  try {
    const filePath = path.join(__dirname, "..", "data", "productos.json");
    const productsData = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(productsData);

    // genera un nuevo ID
    const newProductId = Date.now().toString();

    const newProduct = new Product(
      newProductId,
      newProductData.title,
      newProductData.description,
      newProductData.code,
      newProductData.price,
      newProductData.status,
      newProductData.stock,
      newProductData.category,
      newProductData.thumbnails
    );

    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    
    socket.emit('productoCreado' ,`El producto se ha creado correctamente`)
  

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar un nuevo producto" });
  }
}

// actualiza un producto
async function putProduct(req, res) {
  const productId = req.params.pid;
  const updatedProductData = req.body;

  try {
    const filePath = path.join(__dirname, "..", "data", "productos.json");
    const productsData = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(productsData);

    const updatedProductIndex = products.findIndex((p) => p.id == productId);

    if (updatedProductIndex !== -1) {
      const updatedProduct = new Product(
        productId,
        updatedProductData.title,
        updatedProductData.description,
        updatedProductData.code,
        updatedProductData.price,
        updatedProductData.status,
        updatedProductData.stock,
        updatedProductData.category,
        updatedProductData.thumbnails
      );

      products[updatedProductIndex] = updatedProduct;
      await fs.writeFile(filePath, JSON.stringify(products, null, 2));

      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
}

//  borra un producto
async function deleteProduct(req, res) {
  const productId = req.params.pid;

  try {
    const filePath = path.join(__dirname, "..", "data", "productos.json");
    const productsData = await fs.readFile(filePath, "utf-8");
    let products = JSON.parse(productsData);

    const updatedProducts = products.filter((p) => p.id !== productId);

    await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

    io.emit('productoEliminado', "el producto se elimino exitosamente");


    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
}

module.exports = {
  getProducts,
  getProductId,
  postProduct,
  putProduct,
  deleteProduct,
};
