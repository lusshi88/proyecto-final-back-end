const express = require("express");
const productsRoutes =  require('./routes/products.js');
const cartRoutes = require('./routes/carts.js');
const path = require('path');
const productos = require ("./data/productos.json");


const handlebars = require('express-handlebars'); 


const PORT = 8080;

const app = express();

// motor de plantillas
app.engine("handlebars",handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

// ruta principal
app.get("/",(req, res) => {
  res.render ("./layouts/home.handlebars", {productos: productos});
  });
  



app.use(express.json());
// app.use(express.urlencoded());


const API_PREFIX = "api";

// archivo estatico
app.use(`/static`,express.static(`public`));


app.use(`/${API_PREFIX}/products`, productsRoutes);
app.use(`/${API_PREFIX}/products`, cartRoutes);




// Codigo para iniciar el server ----------------
app.listen(PORT, () => {
  console.log("Server en funcionamiento");
});
