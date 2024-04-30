const express = require("express");
const productsRoutes =  require('./routes/products.js');
const cartRoutes = require('./routes/carts.js');
const viewsRoutes = require('./routes/views.js');
const path = require('path');
const httpServer = require('http');
const displayRoutes = require('express-routemap');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { PORT } = require('./config/config.js');


console.log(PORT);



// puerto del server --------------------------------
const PORT_APP = PORT



const app = express();

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());

//handlebars 
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars")


// MONGODB --------------------------------
const mongoose  = require ("mongoose")
mongoose.connect('mongodb+srv://ecommerce88:UWfDP0RRKUB5Oofa@cluster88.gxgjzbs.mongodb.net/?retryWrites=true&w=majority', {
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



app.use(express.json());
// app.use(express.urlencoded());


const API_PREFIX = "api";

// archivo estatico
app.use(`/static`,express.static(`public`));


app.use(`/${API_PREFIX}/products`, productsRoutes);
app.use(`/${API_PREFIX}/carts`, cartRoutes);

//ruta para la vista de handlebars
app.use(`/views`, viewsRoutes);





// Codigo para iniciar el server ----------------
app.listen(PORT_APP, () => {
  displayRoutes(app)
  console.log(`Server en funcionamiento en el puerto ${PORT_APP} y en el enviroment ${process.env.NODE_ENV}`);
});


app.get ("/"),(req, res) => {
  res.render("index.js")
}

module.exports = {
  httpServer };