const mongoose = require("mongoose");

const collectionName = "ticket";

const ticketSchema = new mongoose.Schema({
        code: {
          type: String,
          unique: true,
          default: function() {
            return uuidv4(); // Genera un código único usando UUID
          }
        },
        purchase_datetime: {
          type: Date,
          default: Date.now // Guarda la fecha y hora actuales por defecto
        },
        amount: {
          type: Number,
          required: true
        },
        purchaser: {
          type: String,
          required: true
        }
      });

      const ticketModel = mongoose.model(collectionName,ticketSchema)

      module.exports = ticketModel;

