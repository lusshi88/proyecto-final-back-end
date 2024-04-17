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
        console.log("valor de cid",cid);
        let cart = await cartModel.findById(cid);
        if (!cart){
            throw new Error("ID del carrito incorrecto");
        }
        console.log("valor de pid", pid);
        const product = await productModel.findById(pid);
        if (!product){
            throw new Error("ID del producto incorrecto");
        }
        const existingProductIndex = cart.products.findIndex(item => item.product.equals(pid));
        
        // const existingProductIndex = cart.products.findIndex(item => item.product && item.product.equals(pid));

        
        console.log(existingProductIndex);
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


module.exports = {
    getCartById,
    createCartService,
    addToCartService,
}