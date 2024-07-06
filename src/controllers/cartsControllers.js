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


async function removeFromCart(req,res) {
  
  const {cid,pid} = req.params
  try {
    const cart = await cartService.removeFromCartService(cid,pid)
    res.status(200).json({message: `producto con el id: ${pid}, eliminado correctamente`,cart});   
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    return res.status(500).json({message:"error del servidor "}); 
  }
}

//función para actualizar el carrito con un arreglo de productos 
async function updatedCart (req,res) {
 try {
  const {cid} = req.params;
  const updatedCart = req.body

  const result = await cartService.updatedCartService(cid,updatedCart);
  if (!result) {
    return res.status(400)({message:"carrito no encontrodo"});
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
    //console.log(`este es el id del cart ${cid}`);
    if (!pid) { 
      return res.status(400).json({ message: "ID del producto no proporcionado" });
    }
    //console.log(`este en el id del producto ${pid}`);
    //paso por body la nueva cantidad 
    const newQuantity = req.body.quantity;
    if (!newQuantity) {
      return res.status(400).json({ message: "Cantidad no proporcionada" });
    }   
    const result = await cartService.productQuantityService(cid,pid,newQuantity);
    return res.status(200).json(result);
  } catch (error) {
    console.log("error en el servidor al actualizar");
    return res.status(500).json({ message:" error en el servidor al actualizar " });
  }
};

//función para borrar todos los productos del carrito
async function removeAllFromCart(req,res) {
  try {
    const {cid} = req.params
    const cart = await cartService.removeAllFromCartService(cid)
    res.status(200).json(cart)

  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error);
    res.status(500).json({message:"error en el servidor", error}) 
  }
}

async function purchaseCart(req, res) {
  try {
    const { cid } = req.params;

    const userId = req.user.id;
    console.log("usuario autenticado v2", req.user.id);

    //manejo de errores para el cid y el userId
    if (!cid){
      return res.status(400).json({ message: "ID del carrito no proporcionado" });
    };
    if (!userId){
      return res.status(401).json({ message: "No se ha autenticado" });
    };
  
    // Llamo al servicio para procesar la compra del carrito
    const { order, unprocessedItems } = await cartService.purchaseCartService (cid, userId);

    // Devuelve la orden y los productos no procesados
    res.status(201).send({ order, unprocessedItems });
  } catch (error) {
    res.status(500).send({ message: error.message });
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
  removeAllFromCart,
  purchaseCart

}