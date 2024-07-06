const userModel = require('../models/userModel'); 
const { isValidPasswd,createHashValue } = require('../utils/encrypt');
const {generateJWT} = require ('../utils/jwt');

async function loginService(email, password) {
    // Buscar el usuario en la base de datos
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        throw new Error('Usuario no registrado');
    }

    // Verificar contraseña
    const isValidComparePsw = await isValidPasswd(password, findUser.password);
    if (!isValidComparePsw) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar token JWT
    const { password: passwordFromDb, first_name, last_name, email: emailDB, age, role, id } = findUser;
    const token = await generateJWT({ id, first_name, last_name, email: emailDB, age, role });

    return { message: `Bienvenido ${email}`, token };
}

async function registerService (userData) {
    const { first_name, last_name, email, age, password, role } = userData;
    const psHashed = await createHashValue(password);
    // Crea un nuevo usuario en la base de datos
    const newUser = await userModel.create({
        first_name, 
        last_name, 
        email, 
        age, 
        role,
        password: psHashed,
    });
    return newUser;
};

module.exports = {
    loginService,
    registerService,
 
};
