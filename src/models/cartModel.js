const mongoose = require("mongoose");

const collectionName = "cart";

const cartsSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
   
  },

  stock:{ 
    type: Number,
    // required: true,
  },
    price:{ 
      type: Number,
      // required: true,
    },
 
});

const cartsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;