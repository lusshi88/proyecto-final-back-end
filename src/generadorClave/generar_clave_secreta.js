const crypto = require ("crypto");

const longitudClave = 16;

const claveSecreta = crypto.randomBytes(longitudClave).toString("hex");

console.log("Esta es la clave secreta: ",claveSecreta);