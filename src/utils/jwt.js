const jwt = require ("jsonwebtoken");

const SECRET_JWT = "7dc1fe516af9b79136407005cbc60b14";

const generateJWT = (user) =>{
    return new Promise (()=> {
        jwt.sign({user},SECRET_JWT,{expiresIn:"30m"},(err,token) => {
            if (err){
                console.log(err);
                reject("can not generate jwt token");
            };
            resolve(token)
        });
    });
};

module.exports = {
    generateJWT,
    SECRET_JWT
};