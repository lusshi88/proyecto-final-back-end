const cartModel = require ("../models/cartModel.js");
const productsModel = require("../models/productsModel.js");
const cartService = require("../services/cartService.js");


//función para crear el carrito
async function createCart(req, res) {
  try {
    // Crear un nuevo carrito vacío
    const newCart = await cartService.createCartService({ products: [] });

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

//función para buscar los productos de un carrito con su ID
async function cartByIdProducts (req,res) {
  try {
  const {cid} = req.params
  console.log(cid);
  if (!cid) {
    return res.status(400).json({ message: "ID del carrito no proporcionado" });
  }
  const cart = await cartService.getCartById(cid);
  console.log(cart);
  if (!cart) {
    return res.status(404).json({ message: "El carrito no existe" });
  }
return res.status(200).json({ message: `Estos son los productos del carrito con el ID: ${cid}`,cart });

} catch (error){
  console.log("error al buscar el carrito por su id",error);
  res.status(500).json({ message: "Error del servidor"});
}
}


//función para agregar un producto al carrito como arreglo

async function cidProductPid (req, res) {

};

//función para mandar un producto al carrito
async function addToCart(req,res) {
  try {

    const {cid,pid} = req.params

    const cart = await cartService.addToCartService (cid,pid);
     
      
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message:"error del servidor"});
  }
}



//función para buscar el producto por id y borrarlo
async function removeFromCart(productId, cartId) {
  try {
    // Busca el producto por su ID en la base de datos
    const product = await productsModel.findById(productId);
    console.log(product);

    if (!product) {
      throw new Error(`producto ${productId} no encontrado`);
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
    throw error; 
  }
}

//función para actualizar el carrito con un arreglo de productos 
async function updatedCart (req,res) {
 try {
  const {cid} = req.params;
  if (!cid) {
    return res.status(400).json({ message: "ID del carrito no proporcionado" });
  }
  const updatedCart = req.body
  const result = await cartModel.findByIdAndUpdate(cid,{products: updatedCart});
  console.log("producto actualizado", result);
  if (!result) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }

  return res.status(200).json({ message: "Carrito actualizado", cart: result });

 } catch (error) {
  console.log("error al actualizar el carrito", error);
  res.status(500).json({message:"Error del servidor"});
  
 }

};

//función para actualizar solo la cantidad del producto , del carrito seleccionado
async function productQuantity (req, res) {
  try {
    // son los parametros del carrito y el producto que se pasa por URL
    const {cid,pid} = req.params;
    //manejo errores por las dudas que no se encuentren el cid y pid
    if (!cid) {
      return res.status(400).json({ message: "ID del carrito no proporcionado" });
    }
    if (!pid) { 
      return res.status(400).json({ message: "ID del producto no proporcionado" });
    }
    //paso por body la nueva cantidad 
    const newQuantity = req.body.quantity;
    if (!newQuantity) {
      return res.status(400).json({ message: "Cantidad no proporcionada" });
    }
    // busco el carrito en la base de datos :)
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    //busca el producto que se paso por params en la base de datos de MONGO
    const product = cart.products.find(product => product._id.toString() === pid);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    product.quantity = newQuantity;

   await cart.save();
    return res.status(200).json({ message: "cantidad actualizada con exito" });

  } catch (error) {
    console.log("error en el servidor al actualizar");
    return res.status(500).json({ message:" error en el servidor al actualizar",error });
  }
};

//función para borrar todos los productos del carrito
async function removeAllFromCart(cartId) {
  try {
    // Encuentra el carrito por su ID y establece el arreglo de productos como vacío
    const updatedCart = await cartModel.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } }, // Establece el arreglo de productos como vacío
      { new: true }
    );

    console.log('Todos los productos eliminados del carrito:', updatedCart);

    return updatedCart;
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error);
    throw error; 
  }
}


module.exports = {
  createCart,
  cartByIdProducts,
  cidProductPid,
  addToCart,
  removeFromCart,
  updatedCart,
  productQuantity,
  removeAllFromCart

}