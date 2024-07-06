const userService = require ("../services/userService");

async function getUser (req,res){
    try {
        const user = await userService.getUserService();
        res.json({message:"Lista de usuarios",user});
    } catch (error) {
        res.status(500).json({message:"error del servidor, al traer los usuarios"});
    }
};

module.exports = {
    getUser
};