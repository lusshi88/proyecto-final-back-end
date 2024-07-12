const userService = require ("../services/userService");


async function getUser (req,res){
    try {
        req.logger.info('Iniciando búsqueda de usuarios');
        const user = await userService.getUserService();
        req.logger.info(`Usuarios encontrados: ${user.length}`);
        res.json({message:"Lista de usuarios",user});
    } catch (error) {
        req.logger.error(`Error al obtener usuarios: ${error.message}`);
        res.status(500).json({message:"error del servidor, al traer los usuarios"});
    }
};

async function getUserById (req,res){
    try {
        req.logger.info('Iniciando búsqueda de usuario por ID');
        const {userId} = req.params;
        if (!userId){
            return res.status(400).json({message:"Debe proporcionar un ID de usuario"});
        };
        const user = await userService.getUserByIdService(userId);
        req.logger.info(`Usuario encontrado por ID ${userId}: ${user}`);
        return res.json ({message: "Usuarios encontrados por id:",user});

    } catch (error) {
        req.logger.error(`Error al obtener usuario por ID: ${error.message}`);
        return res.status(500).json({message:"Error en el servidor,al encontrar usuario por ID",error});
    }
};

async function getdeleteUserById (req,res){
    try {
        req.logger.info('Iniciando eliminación de usuario por ID');
        const {userId} = req.params;
        if (!userId){
            return res.status(400).json({message:"Debe proporcionar un ID de usuario"});
        };
        const user = await userService.deleteUserByIdService(userId);
        req.logger.info(`Usuario eliminado con éxito: ${user}`);
        return res.json({message: "Usuario eliminado con éxito",user});
    } catch (error) {
        req.logger.error(`Error al borrar usuario por ID: ${error.message}`);
        return res.status(500).json({message:"Error en el servidor, al borrar usuario por ID",error});
    }
};

module.exports = {
    getUser,
    getUserById,
    getdeleteUserById
};