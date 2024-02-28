// const fs = require('fs/promises');
// const path = require('path');

const cartModel = require ("../models/cartModel.js")
const productsModel = require("../models/productsModel.js");

async function createCart(req, res) {
  try {
    // Crear un nuevo carrito vacío
    const newCart = await cartModel.create({ products: [] });

    console.log('Carrito insertado:', newCart);
    
    return res.status(200).json({
      message: "Inserción exitosa",
      cart: newCart
    });
  } catch (error) {
    console.error('Error al insertar el carrito:', error);
    return res.status(500).json({ error: 'Error al insertar el carrito' });
  }
}



//intento mandar un producto al carrito vacio que cree arriba :)
async function addToCart(productId, cartId) {
  try {
    // Busca el producto por su ID en la base de datos
    const product = await  productsModel.findById(productId);
    console.log(product);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Encuentra el carrito por su ID y agrega el producto
    const updatedCart = await cartModel.findByIdAndUpdate(cartId, { $push: { products: product } }, { new: true });

    console.log('Producto agregado al carrito:', updatedCart);

    return updatedCart;
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    throw error; // Manejar el error según sea necesario
  }
}

//funcion para buscar el producto por id y borrarlo
async function removeFromCart(productId, cartId) {
  try {
    // Busca el producto por su ID en la base de datos
    const product = await productsModel.findById(productId);
    console.log(product);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Encuentra el carrito por su ID y remueve el producto
    const updatedCart = await cartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { _id: productId } } },
      { new: true }
    );

    console.log('Producto eliminado del carrito:', updatedCart);

    return updatedCart;
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    throw error; // Manejar el error según sea necesario
  }
}

module.exports = {
  createCart,
  addToCart,
  removeFromCart

}