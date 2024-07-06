const userModel = require ( "../models/userModel");

async function getUserService (req,res){
    try {
        const users = await userModel.find().select('first_name last_name age email role');
        return users;
    } catch (error) {
        throw new Error ({message: "error del servidor al obtener los usuarios"})
    }
};

module.exports = {
    getUserService
};