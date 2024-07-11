const userModel = require ("../models/userModel");
const authService = require ("../services/authService");


async function login (req,res) {
    const {email,password} = req.body;
    try {
        const result = await authService.loginService(email,password);
        res.json(result);
    } catch (error) {
        res.status(401).json({message:"error"});
    }
};

async function register (req,res) {
    const { first_name, last_name, email, age, password, role } = req.body;
    //valido que todos los campos estén presentes y no estén vacíos.
    if (!first_name || !last_name || !email || !age || !password || !role) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    try {
        const newUser = await authService.registerService({ first_name, last_name, email, age, password, role });
        res.json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    login,
    register
};