const cartModel = require ('../models/cartModel');
const productModel = require ('../models/productsModel');

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

module.exports = {
    getCartById,
    createCartService,
    addToCartService,
    removeFromCartService,
    updatedCartService,
    productQuantityService,
    removeAllFromCartService,
}