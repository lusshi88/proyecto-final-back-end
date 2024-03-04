const mongoose = require("mongoose");
// const { schema } = require("./cartModel");

const  mongoosePaginate = require("mongoose-paginate-v2");

const collectionName = "products";

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
    type: Number,
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

cartsSchema.plugin(mongoosePaginate)

const cartsModel = mongoose.model(collectionName, cartsSchema);
module.exports = cartsModel;