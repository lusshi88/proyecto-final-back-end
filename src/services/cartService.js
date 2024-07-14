const cartModel = require ('../models/cartModel');
const productsModel = require ('../models/productsModel');
const orderModel = require ('../models/orderModel');
const ticketModel = require('../models/ticketModel');
const { log } = require('handlebars/runtime');
const mongoose = require('mongoose');


async function createCartService(userId) {
  try {
      // Crea un nuevo carrito asociado al usuario con una lista de productos vacía
      const newCart = await cartModel.create({ products: [], createdBy: userId });
      return newCart; // Devuelve el carrito creado
  } catch (error) {
      console.error('Error al crear el carrito:', error.message);
      throw new Error('Error al crear el carrito'); 
  }
};

//esta función busca el carrito por el id 
async function getCartById (cartId) {
    try {
        const cart = await cartModel.findById(cartId);
        return cart;
    } catch (error) {
        console.log("error al buscar el id del carrito");
    }
};

async function addToCartService(cid, pid) {
  try {
      // Buscar el carrito por su ID
      let cart = await cartModel.findById(cid);
      if (!cart) {
          throw new Error("ID del carrito incorrecto");
      }

      // Buscar el producto por su ID
      const product = await productsModel.findById(pid);
      if (!product) {
          throw new Error("ID del producto incorrecto");
      }

      const existingProductIndex = cart.products.findIndex(item => item.productId.equals(pid));
      
      if (existingProductIndex !== -1) {
          // Incrementar la cantidad si el producto ya está en el carrito
          cart.products[existingProductIndex].quantity++;
      } else {
          // Agregar un nuevo producto al carrito con cantidad 1
          cart.products.push({ productId: pid, quantity: 1 });
      }

      // Guardar los cambios en el carrito
      cart = await cart.save();

      // Poblar los detalles completos del producto en el carrito
      //cart = await cartModel.findById(cid).populate('products.productId');
      cart = await cartModel.findById(cid).populate({
        path: 'products.productId',
        select: 'title description color' // Seleccionar los campos que deseas mostrar del producto
    });

      return cart;
  } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      throw error;
  }
}

async function removeFromCartService (cid,pid) {
    try {
        // Busca el producto por su ID en la base de datos
    const product = await productModel.findById(pid);
    console.log("este es el producto encontrado"+product);

    if (!product) {
      throw new Error(`producto ${pid} no encontrado`);
    }
    //busco el carrito por su ID 
    const cart = await cartModel.findById(cid);
    if (!cart) {
        throw new Error(`carrito ${cid} no encontrado`);
    };
    // Encuentra el carrito por su ID y remueve el producto
    const updatedCart = await cartModel.findByIdAndUpdate(
        cid,
        { $pull: { products: { product: pid } } },
        { new: true }     
      );
      console.log('Producto eliminado del carrito:', updatedCart);
      return updatedCart;
    } catch (error) {   
        console.log("error al eliminar el producto");
        throw error;
        
    }
};

async function updatedCartService (cid,updatedCart) {
    try {
        const result = await cartModel.findByIdAndUpdate(cid,{products: updatedCart});
      console.log("producto actualizado", result);
   
    return result;
    } catch (error) {
        console.log("error al actualizar el carrito");
        throw error;
        
    }
};

async function productQuantityService (cid,pid,newQuantity) {
    try {
        // busco el carrito en la base de datos 
    const cart = await cartModel.findById(cid);
    console.log( "esto trae el cart:"+ cart);
    if (!cart) {
    throw new Error(`carrito ${cid} no encontrado`);
    }
    // Busca el producto dentro del carrito
    const product = cart.products.find(product => product.product.toString() === pid);
    console.log("esto es lo que contiene el product:", product);
    if (!product) {
        throw new Error(`Producto ${pid} no encontrado en la base de datos`);
    }
    product.quantity =  parseInt(newQuantity);
    await cart.save();
    return { message: "cantidad actualizada con exito" };
    } catch (error) {
        throw new Error ("error al actualizar la cantidad")
        
    }
};


async function removeAllFromCartService (cid){
     // Encuentra el carrito por su ID y establece el arreglo de productos como vacío
     const updatedCart = await cartModel.findByIdAndUpdate(
        cid,
        { $set: { products: [] } }, // Establece el arreglo de productos como vacío
        { new: true }
      );
  
      console.log('Todos los productos eliminados del carrito:', updatedCart);
  
      return updatedCart;
};

async function purchaseCartService(cartId, purchaser) {
  try {
      // Obtiene el carrito por su ID
      const cart = await cartModel.findById(cartId).populate('products.product');

      // Arreglo para almacenar los IDs de los productos que no se pudieron comprar
      let productsNotPurchased = [];

      // Arreglo para almacenar los productos que se van a comprar
      let productsToPurchase = [];

      // Verifica el stock de cada producto en el carrito
      for (const item of cart.products) {
          const product = item.productId;
          const requestedQuantity = item.quantity;

          // Verifica si hay suficiente stock
          if (product.stock >= requestedQuantity) {
              // Resta el stock del producto
              product.stock -= requestedQuantity;
              await product.save();

              // Agrega el producto a los productos que se van a comprar
              productsToPurchase.push({
                  product: product._id,
                  quantity: requestedQuantity
              });
          } else {
              // Si no hay suficiente stock, agrega el ID del producto a los no comprados
              productsNotPurchased.push(product._id);
          }
      }

      // Crea un ticket con los productos que se pudieron comprar
      const ticket = await ticketModel.create({
          products: productsToPurchase,
          totalAmount: cart.totalAmount,
          purchaser: purchaser // Nombre del comprador recibido como parámetro
      });

      // Filtra los productos que no se pudieron comprar del carrito
      cart.products = cart.products.filter(item => !productsNotPurchased.includes(item.product.toString()));
      await cart.save();

      // Devuelve los IDs de los productos que no se pudieron comprar y el ticket generado
      let response = {
          ticket: ticket,
          productsNotPurchased: productsNotPurchased
      };

      return response;
  } catch (error) {
      throw new Error('Error al finalizar la compra del carrito y generar el ticket');
  }
}

module.exports = {
    getCartById,
    createCartService,
    addToCartService,
    removeFromCartService,
    updatedCartService,
    productQuantityService,
    removeAllFromCartService,
    purchaseCartService
}