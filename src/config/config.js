const {config} = require ("dotenv")

config ({
    path: `.env.${process.env.NODE_ENV || "development" }.local `
});

console.log(`.env.${process.env.NODE_ENV } `);

const PORT = process.env.PORT ;
module.exports = {
    PORT
};


