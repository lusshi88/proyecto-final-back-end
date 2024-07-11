const userService = require ("../services/userService");

async function getUser (req,res){
    try {
        const user = await userService.getUserService();
        res.json({message:"Lista de usuarios",user});
    } catch (error) {
        res.status(500).json({message:"error del servidor, al traer los usuarios"});
    }
};

async function getUserById (req,res){
    try {
        const {userId} = req.params;
        if (!userId){
            return res.status(400).json({message:"Debe proporcionar un ID de usuario"});
        };
        const user = await userService.getUserByIdService(userId);
        return res.json ({message: "Usuarios encontrados por id:",user});

    } catch (error) {
        return res.status(500).json({message:"Error en el servidor,al encontrar usuario por ID",error});
    }
};

async function getdeleteUserById (req,res){
    try {
        const {userId} = req.params;
        if (!userId){
            return res.status(400).json({message:"Debe proporcionar un ID de usuario"});
        };
        const user = await userService.deleteUserByIdService(userId);
        return res.json({message: "Usuario eliminado con éxito",user});
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor, al borrar usuario por ID",error});
    }
};

module.exports = {
    getUser,
    getUserById,
    getdeleteUserById
};