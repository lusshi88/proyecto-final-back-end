const express = require("express");
const productsRoutes =  require('./routes/products.js');
const cartRoutes = require('./routes/carts.js');

const PORT = 8080;

const app = express();

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
