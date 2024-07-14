const mongoose = require("mongoose");

const collectionName = "cart";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", // Referencia al modelo de productos
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
     
      
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Referencia al modelo de usuario que creó el carrito
    required: true
}
});


const cartsModel = mongoose.model(collectionName, cartsSchema);

module.exports = cartsModel;
