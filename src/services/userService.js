const userModel = require ( "../models/userModel");

async function getUserService (req,res){
    try {
        const users = await userModel.find().select('first_name last_name age email role');
        return users;
    } catch (error) {
        throw new Error ({message: "error del servidor al obtener los usuarios"})
    }
};

async function upgradeUserToPremiumService(userId) {
    try {
      // Buscar al usuario por su ID
      let user = await userModel.findById(userId);
      console.log("usuario id",userId);
      console.log("userId: " + user);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
  
      // Actualizar el rol del usuario a 'premium'
      user.role = 'premium';
      await user.save();
  
      return user;
    } catch (error) {
        throw new Error(`Error al actualizar el rol del usuario: ${error.message}`);}
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
    upgradeUserToPremiumService,
    getUserByIdService,
    deleteUserByIdService
};