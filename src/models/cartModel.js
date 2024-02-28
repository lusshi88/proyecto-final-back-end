const mongoose = require("mongoose");

const collectionName = "cart";

const cartsSchema = new mongoose.Schema({
  products:{
    type: [
        {
            product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        },
    ],
    default: [],
}
  
});

const cartsModel = mongoose.model(collectionName, cartsSchema);

module.exports = cartsModel;