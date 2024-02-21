const mongoose = require("mongoose");

const collectionName = "ecommerce";

const cartsSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true}
 
});

const cartsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;