const userModel = require ( "../models/userModel");

async function getUserService (req,res){
    try {
        const users = await userModel.find().select('first_name last_name age email role');
        return users;
    } catch (error) {
        throw new Error ({message: "error del servidor al obtener los usuarios"})
    }
};

async function getUserByIdService (userId){
    try {
        const user = await userModel.findById(userId);
        if (!user) throw new Error("ID del usuario invalido");
        return user;
    } catch (error) {
       throw new Error ({message: "Error del servidor al obtener usuario por ID "});     
    }
};

async function deleteUserByIdService (userId){
    try {
       const user = await userModel.findByIdAndDelete(userId); 
       if (!user) throw new Error("ID del usuario invalido");
       return user;
    } catch (error) {
        
    }
};
module.exports = {
    getUserService,
    getUserByIdService,
    deleteUserByIdService
};