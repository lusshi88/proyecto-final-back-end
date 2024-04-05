const chatModel = require("../models/chatModel");

async function createMessage (req, res) {
    try {
const {user,message} = req.body;

if (!user ||!message) {
  return res.status(400).json({ message: "El usuario o el mensaje no pueden estar vacíos" });
}
    const newMessage = await chatModel.create({user,message});
    res.status(200).json({  newMessage });
} catch (error) {
    res.status(500).json({ error: "error en el servidor" });
}

};

async function getMessages (req, res) {
    try {
        
    } catch (error) {
        
    }
};

module.exports = {
  createMessage,
  getMessages
};

