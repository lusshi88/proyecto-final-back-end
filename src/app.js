const express = require("express");
const path = require('path');
const httpServer = require('http');
const displayRoutes = require('express-routemap');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const swaggerJSDoc = require ("swagger-jsdoc");
const swaggerUi = require ("swagger-ui-express");

//Rutas importadas
const productsRoutes =  require('./routes/products.js');
const cartRoutes = require('./routes/carts.js');
const viewsRoutes = require('./routes/views.js');
const authRoutes = require ("./routes/auth.js");
const usersRoutes = require ("./routes/user.js")
const initializePassport = require("./config/passport.config");
const { useLogger } = require ('./utils/logger.js')
const { swaggerOpts } = require('./config/swagger.config.js')




const { PORT } = require('./config/config.js');


console.log(PORT);



// puerto del server --------------------------------
const PORT_APP = PORT


const app = express();

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());
// Middleware para inicializar Passport.js y manejar la autenticación de usuarios
app.use(express.urlencoded({extended: true }));

//logger
app.use(useLogger);

//passport
initializePassport();
app.use(passport.initialize());

// Swagger
const specs = swaggerJSDoc(swaggerOpts);


//handlebars 
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars")


// MONGODB --------------------------------
const mongoose  = require ("mongoose")
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
    dbName: 'ecommerce',
  })
    .then((conn) => {
        console.log("CONNECTED TO MONGODB ")
    })
    .catch((err) => {
        console.log("ERROR CONNECTING TO DB", err)
    })



// productos de mi JSON
const productos = require ("./data/productos.json");


const API_PREFIX = "api";

// archivo estatico
app.use(`/static`,express.static(`public`));


//rutas 
app.use(`/${API_PREFIX}/products`, productsRoutes);
app.use(`/${API_PREFIX}/carts`, cartRoutes);
app.use (`/${API_PREFIX}/auth`,authRoutes);
app.use (`/${API_PREFIX}/users`, usersRoutes);
app.use (`/${API_PREFIX}/docs`,swaggerUi.serve, swaggerUi.setup(specs));

//ruta para la vista de handlebars
app.use(`/${API_PREFIX}/views`, viewsRoutes);

// Codigo para iniciar el server ----------------
app.listen(PORT_APP, () => {
  displayRoutes(app)
  console.log(`Server en funcionamiento en el puerto ${PORT_APP} y en el ambiente: ${process.env.NODE_ENV}`);
});


app.get ("/"),(req, res) => {
  res.render("index.js")
}

module.exports = {
  httpServer };