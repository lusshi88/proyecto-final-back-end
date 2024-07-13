const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const collectionName = "productspremium";

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

const productsPremiumModel = mongoose.model(collectionName, cartsSchema,collectionName);
module.exports = productsPremiumModel;