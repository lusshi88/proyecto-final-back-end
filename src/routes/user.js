const {Router} = require('express');
const userModel = require('../models/userModel');
const handlePolicies = require('../middleware/handle-policies.middleware');


const router = Router();

//PUBLIC
router.get("/",handlePolicies(["PUBLIC"]), async (req, res ) => {
    try {
        const users = await userModel.find();
        return res.json({message:"Lista de usuarios", users: users});
    } catch (error) {
        console.log("Error del servidor al traer los usuarios",error);
        return res.status(500).json({message:"Error del servidor"});
    }
});

//ADMIN y USER
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

//ADMIN
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