const { Router } = require('express');

const userModel = require("../models/userModel");
const { createHashValue, isValidPasswd } = require("../utils/encrypt");
const { generateJWT,SECRET_JWT } = require("../utils/jwt");

const router = Router();

router.post("/login", async (req, res) => {
try {
    const {email,password} = req.body;
    console.log("email del body",email);
    console.log("password:",password);

    //busco el email (que pase por body) en la base de datos 
    const findUser = await userModel.findOne({email});

    //verifico si existe el email en la base de datos
    if (!findUser){
    return res.status(401).json({message:"usuario no registrado"})    
    };

    const isValidComparePsw = await isValidPasswd(password,findUser.password)
    if (!isValidComparePsw) {
        res.status(401).json ({message:"contraseña incorrecta"})
    };

    const {password: passwordFromDb, first_name,last_name,email: emailDB,age,role ,id} = findUser

    const token = await generateJWT({id,first_name,last_name,email: emailDB,age,role});

    return res.json ({message: `bienvenido ${email},`,token});
    
} catch (error) {
    console.log("error al generar token",error);
    
}
});

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;
        const psHashed = await createHashValue(password);
        const newUser = userModel.create({
            first_name, last_name, email, age, role,
            //aca hasheo la contraseña que crea el usuario
            password: psHashed,
        });
        return res.json({message:"usuario creado exitosamente", user: newUser});
    } catch (error) {
        console.log("error al crear el usuario ",error);

    }
});

module.exports = router;