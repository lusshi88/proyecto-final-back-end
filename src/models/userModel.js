const mongoose = require("mongoose");


const  mongoosePaginate = require("mongoose-paginate-v2");

const collectionName = "user";

const roleType = {
  USER: "USER",
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
};

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
   
  },
  last_name:{ 
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  password:{ 
    type: String,
    required: true,
  },
  cart_id:[{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart", // Referencia al modelo de cart
      default: [],
    }],
role:{ 
  type: String,
  enum: Object.values(roleType),
  default:"USER",
},
});

UserSchema.plugin(mongoosePaginate)

const userModel = mongoose.model(collectionName, UserSchema);
module.exports = userModel;