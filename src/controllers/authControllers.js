const userModel = require ("../models/userModel");
const authService = require ("../services/authService");


async function login (req,res) {
    const {email,password} = req.body;
    try {
        req.logger.info(`Iniciando sesión para el usuario con email: ${email}`);
        const result = await authService.loginService(email,password);
        req.logger.info(`Inicio de sesión exitoso para el usuario con email: ${email}`);
        res.json(result);
    } catch (error) {
        req.logger.error(`Error al iniciar sesión para el usuario con email: ${email}`);
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
        req.logger.info(`Registrando nuevo usuario con email: ${email}`);
        const newUser = await authService.registerService({ first_name, last_name, email, age, password, role });
        req.logger.info(`Usuario registrado exitosamente con email: ${email}`);
        res.json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
        req.logger.error(`Error al registrar el usuario con email: ${email}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    login,
    register
};