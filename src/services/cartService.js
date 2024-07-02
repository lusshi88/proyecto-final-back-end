const cartModel = require ('../models/cartModel');
const productModel = require ('../models/productsModel');
const orderModel = require ('../models/orderModel');
const ticketModel = require('../models/ticketModel');


//esta función crea el carrito
async function createCartService (req,res) {
    try {
        const newCart = await cartModel.create({ products: [] })
        return newCart
        
    } catch (error) {
        console.log("error al crear el carrito");
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

async function addToCartService (cid,pid) {
    try {
        let cart = await cartModel.findById(cid);
        if (!cart){
            throw new Error("ID del carrito incorrecto");
        }
        const product = await productModel.findById(pid);
        if (!product){
            throw new Error("ID del producto incorrecto");
        }
        const existingProductIndex = cart.products.findIndex(item => item.product.equals(pid));
         
        if (existingProductIndex !== -1) {
            // Incrementar la cantidad si el producto ya está en el carrito
            cart.products[existingProductIndex].quantity++;
            console.log(cart.products[existingProductIndex]);
          } else {
            //Agrega un nuevo producto al carrito con cantidad 1
            cart.products.push({ product: pid, quantity: 1 });
          }
          cart = await cart.save();

          await cart.populate('products.product')
          return cart
    } catch (error) {
        console.log("no se pudo agregar la cantidad del producto");
        throw error;
    }
};

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

async function purchaseCartService (cid,userId){
    try {
        // Busca el carrito por su ID y hace la populación de los productos
    const cart = await cartModel.findById(cid).populate('items.productId');
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    let itemsToOrder = []; // Lista de productos que se incluirán en la orden
    let total = 0; // Total del costo de la orden
    let unprocessedItems = []; // Lista de productos que no pudieron ser procesados por falta de stock

    // Verifica stock de cada producto en el carrito
    for (let item of cart.items) {
      const product = await productModel.findById(item.productId);
      console.log(item.productId);
      if (product.stock >= item.quantity) {
        // Si hay suficiente stock, resta la cantidad del stock del producto
        product.stock -= item.quantity;
        await product.save();

        // Agrega el producto a la lista de la orden
        itemsToOrder.push({
          productId: product._id,
          quantity: item.quantity,
          price: item.price
        });

        // Sumar el costo del producto al total
        total += item.price * item.quantity;
      } else {
        // Si no hay suficiente stock, agrega a la lista de productos no procesados
        unprocessedItems.push({
          productId: product._id,
          quantity: item.quantity,
          price: item.price
        });
      }
    }

    // Crea una nueva orden con los productos procesados
    const order = new orderModel({
      userId: userId,
      items: itemsToOrder,
      total: total,
      status: 'pending'
    });
    await order.save();

    // Genera un ticket de compra con los datos de la orden
    const ticket = new ticketModel({
      orderId: order._id,
      userId: userId,
      items: itemsToOrder,
      total: total
    });
    await ticket.save();

    // Si hay productos no procesados, actualiza el carrito con estos productos
    if (unprocessedItems.length > 0) {
      cart.items = unprocessedItems;
      await cart.save();
    } else {
      // Si todos los productos fueron procesados, elimina el carrito
      await cartModel.findByIdAndDelete(cid);
    }

    // Devuelve la orden y los IDs de los productos no procesados
    return { order, unprocessedItems: unprocessedItems.map(item => item.productId) };
    } catch (error) {
        throw new Error ("Error al procesar la compra")
    }

};

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