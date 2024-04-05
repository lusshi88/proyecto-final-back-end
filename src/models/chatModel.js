const mongoose = require("mongoose");

const collectionName = "message"

const chatSchema = new mongoose.Schema({
    user :{
        type: String,
        required: true,
    },

    message:{
        type: String,
        required: true,
    }
 });

 const chatModel = new mongoose.model(collectionName,chatSchema)

 module.exports = chatModel;