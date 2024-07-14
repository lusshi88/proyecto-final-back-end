const cartModel = require ("../models/cartModel.js");
const productsModel = require("../models/productsModel.js");
const cartService = require("../services/cartService.js");

//función para crear el carrito asociado al usuario actual
async function createCart(req, res) {
  const {userId} = req.body;
  try {
      req.logger.info(`Usuario ${userId} está creando un nuevo carrito`);
      
      // Llama al servicio para crear un nuevo carrito asociado al usuario actual
      const newCart = await cartService.createCartService(userId);

      req.logger.info(`Carrito insertado: ${newCart}`);

      // Devuelve una respuesta con el carrito creado
      return res.status(201).json({
          message: "Inserción exitosa",
          cart: newCart
      });
  } catch (error) {
      req.logger.error(`Error al insertar el carrito: ${error.message}`);
      return res.status(500).json({ error: 'Error al insertar el carrito' });
  }
};

//función para buscar los productos de un carrito con su ID
async function cartByIdProducts (req,res) {
  try {
  const {cid} = req.params
  req.logger.info(`Buscando productos del carrito con ID: ${cid}`);

  if (!cid) {
    return res.status(400).json({ message: "ID del carrito no proporcionado" });
  }
  const cart = await cartService.getCartById(cid);

  if (!cart) {
    req.logger.warn(`El carrito con ID ${cid} no existe`);
    return res.status(404).json({ message: "El carrito no existe" });
  }
  req.logger.info(`Productos encontrados para el carrito con ID ${cid}: ${cart}`);
return res.status(200).json({ message: `Estos son los productos del carrito con el ID: ${cid}`,cart });

} catch (error){
  req.logger.error(`Error al buscar el carrito por su ID: ${error}`);
  res.status(500).json({ message: "Error del servidor"});
}
}


//función para mandar un producto al carrito
async function addToCart(req,res) {
  try {
    const {cid,pid} = req.params
    req.logger.info(`Añadiendo producto ${pid} al carrito ${cid}`);
    if (!cid){
      return res.status(400).json({ message: "ID del carrito no proporcionado" });
    };
    if (!pid) {
      return res.status(400).json({ message: "ID del producto no proporcionado" });
    }
    
    const cart = await cartService.addToCartService (cid,pid);
    if (!cart) {
      req.logger.warn(`No se pudo agregar el producto ${pid} al carrito ${cid}`);
      return res.status(404).json({ message: "No se pudo agregar el producto al carrito" });
    }
        
    return res.status(200).json(cart);
  } catch (error) {
    req.logger.error(`Error al agregar producto al carrito: ${error}`);
    res.status(500).json({ message:"error del servidor"});
  }
};


async function removeFromCart(req,res) {
  const {cid,pid} = req.params
  req.logger.info(`Eliminando producto ${pid} del carrito ${cid}`);
  if (!cid){
    return res.status(400).json({ message: "ID del carrito no proporcionado" });
  };
  if (!pid) {
    return res.status(400).json({ message: "ID del producto no proporcionado" });
  };
  try {
    const cart = await cartService.removeFromCartService(cid,pid)
    if (!cart) {
      req.logger.warn(`No se pudo eliminar el producto ${pid} del carrito ${cid}`);
      return res.status(404).json({ message: "El producto no se pudo eliminar del carrito" });
    }
    req.logger.info(`Producto ${pid} eliminado correctamente del carrito ${cid}`);
    res.status(200).json({message: `producto con el id: ${pid}, eliminado correctamente`,cart});   
  } catch (error) {
    req.logger.error(`Error al eliminar producto del carrito: ${error}`);
    return res.status(500).json({message:"error del servidor "}); 
  }
}

//función para actualizar el carrito con un arreglo de productos 
async function updatedCart (req,res) {
 try {
  const {cid} = req.params;
  req.logger.info(`Actualizando carrito con ID: ${cid}`);
  if (!cid){
    return res.status(400).json({ message: "ID del carrito no proporcionado" });
  };
  const updatedCart = req.body
  if (!updatedCart) {
    return res.status(400).json({ message: "Nuevos productos no proporcionados" });
  }

  const result = await cartService.updatedCartService(cid,updatedCart);
  if (!result) {
    return res.status(400)({message:"carrito no encontrodo"});
  }
  req.logger.info(`Carrito actualizado correctamente: ${result}`);

  return res.status(200).json({ message: "Carrito actualizado", cart: result });

 } catch (error) {
  req.logger.error(`Error al actualizar el carrito: ${error}`);
  res.status(500).json({message:"Error del servidor"});
  
 }

};

//función para actualizar solo la cantidad del producto , del carrito seleccionado
async function productQuantity (req, res) {
  try {
    // son los parametros del carrito y el producto que se pasa por URL
    const {cid,pid} = req.params;
    req.logger.info(`Actualizando cantidad del producto ${pid} en el carrito ${cid}`);
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
    const result = await cartService.productQuantityService(cid,pid,newQuantity);
    if (!result){
      return res.status(404).json({ message: "No se pudo actualizar la cantidad del producto" });
    };
    req.logger.info(`Cantidad del producto ${pid} actualizada correctamente en el carrito ${cid}`);
    return res.status(200).json(result);
  } catch (error) {
    req.logger.error(`Error al actualizar la cantidad del producto en el carrito: ${error}`);
    return res.status(500).json({ message:" error en el servidor al actualizar " });
  }
};

//función para borrar todos los productos del carrito
async function removeAllFromCart(req,res) {
  try {
    const {cid} = req.params
    req.logger.info(`Eliminando todos los productos del carrito con ID: ${cid}`);
    if (!cid){
      return res.status(400).json({ message: "ID del carrito no proporcionado" });
    };
    const cart = await cartService.removeAllFromCartService(cid)
    if (!cart) {
      return res.status(404).json({ message: "No se pudo eliminar todos los productos del carrito" });
    }
    req.logger.info(`Todos los productos del carrito con ID ${cid} eliminados correctamente`);
    res.status(200).json(cart)

  } catch (error) {
    req.logger.error(`Error al eliminar todos los productos del carrito: ${error}`);
    res.status(500).json({message:"error en el servidor", error}) 
  }
}

//función para finalizar la compra del carrito
  async function purchaseCart(req, res) {
    const cartId = req.params.cid;

    try {
        // Llama al servicio para finalizar la compra y generar un ticket
        const result = await cartService.purchaseCartService(cartId, req.user.username); 

        // Devuelve la respuesta del servicio
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
  createCart,
  cartByIdProducts,
  addToCart,
  removeFromCart,
  updatedCart,
  productQuantity,
  removeAllFromCart,
  purchaseCart

}