const express = require("express");
const productsRoutes =  require('./routes/products.js');

const PORT = 8000;

const app = express();

app.use(express.json());
// app.use(express.urlencoded());


const API_PREFIX = "api";

// archivo estatico
app.use(`/static`,express.static(`public`));


app.use(`/${API_PREFIX}/products`, productsRoutes);




// Codigo para iniciar el server ----------------
app.listen(PORT, () => {
  console.log("hola");
});
