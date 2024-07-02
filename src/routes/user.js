const {Router} = require('express');
const userModel = require('../models/userModel');
const handlePolicies = require('../middleware/handle-policies.middleware');


const router = Router();

//Ruta para mostrar todos los usuarios , es pública.
router.get("/",handlePolicies(["PUBLIC"]), async (req, res ) => {
    try {
        const users = await userModel.find().select('first_name last_name age email role');
        return res.json({message:"Lista de usuarios", users: users});
    } catch (error) {
        console.log("Error del servidor al traer los usuarios",error);
        return res.status(500).json({message:"Error del servidor"});
    }
});

//Ruta para mostrar cada usuario por su ID, esta ruta solo la pueden usar los: USER Y ADMIN.
router.get ("/:userId",handlePolicies(["USER","ADMIN"]), async (req, res) => {
try {
    const {userId} = req.params;
   
    const userData = await userModel.findById(userId);
    if (!userData){
        return res.status(404).json({message:"ID de usuario invalido"});
    };

    return res.json ({message:"Usuarios encontrados por id", user: userData});
} catch (error) {
    console.log("Error al traer el usuario por id", error);
    return res.status(500).json({message:"Error del servidor"});
}
});

//Ruta para borrar un usuario, solo el ADMIN , la puede usar.
router.delete ("/:userId",handlePolicies(["ADMIN"]), async (req, res) => {
    try {
        const {userId} = req.params;

        const userData = await userModel.findByIdAndDelete(userId);
        if (!userData){
            return res.status(404).json({message:"ID de usuario invalido"});
        };
        return res.json ({message: "Usuario eliminado exitosamente", data: userData});
    } catch (error) {
        console.log("Error del servidor al intentar borrar usuario", error);
        return res.status (500).json({message: "Error el servidor"});  
        
    }
});

module.exports = router;