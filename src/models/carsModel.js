const mongoose = require("mongoose");

const collectionName = "cars";

const cartsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
   
  },
  description:{ 
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true
  },
  stock:{ 
    type: Number,
    required: true,
  },
    price:{ 
      type: Number,
      required: true,
    },
 
});

const cartsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;