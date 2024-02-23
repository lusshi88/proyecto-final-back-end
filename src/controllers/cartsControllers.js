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





// async function getCartId(req, res) {
//     const cartId = req.params.cid;
  
//     try {
//       const filePath = path.resolve(__dirname, '..', 'data', 'carrito.json');
  
//       // Leer el contenido del archivo antes de escribir en él
//       const cartsData = await fs.readFile(filePath, 'utf-8');
      
//       // Parsear el contenido del archivo JSON en un array de carritos
//       let carts;
//       try {
//         carts = JSON.parse(cartsData);
//       } catch (error) {
//         console.error( 'Error al analizar el contenido del archivo JSON:' );
//         return res.status(500).json({ error: 'Error en el formato del archivo JSON' });
//       }
  
//       //  buscar el carrito por su ID
//       const cart = carts.find((cart) => cart.id === cartId);
  
//       if (cart) {
//         res.status(208).json(cart.products);
//       } else {
//         res.status(404).json({ error: 'Carrito no encontrado' });
//       }
  
//       //  escribe los cambios de vuelta al archivo
//       await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
//     } catch (error) {
//       res.status(500).json({ error: 'Error al obtener el carrito' });
//     }
//   }
module.exports = {
  createCart,
  addToCart

}