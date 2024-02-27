const mongoose = require("mongoose");

const collectionName = "cart";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  quantity:{
    type: Number,
    default: 1,
  }
})

const cartsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;