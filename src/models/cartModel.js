const mongoose = require("mongoose");

const collectionName = "cart";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", // Referencia al modelo de productos
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
    
    }
  ]
});

const cartsModel = mongoose.model(collectionName, cartsSchema);

module.exports = cartsModel;
