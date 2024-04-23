const productsModel = require ("../models/productsModel");
const cartModel = require ("../models/cartModel");

async function createProductsService (carsData){
    try {
        let result = await productsModel.create(carsData)
        console.log(carsData);
        return result
    } catch (error) {
        throw new Error ("error en el servicio, al crear el producto");
        
    }
};


  async function  getProductsService (page=1, limit=10) {
    try {
        const {
            docs,
            totalDocs,
            limit: limitPag,
            totalPages,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            prevLink,
          } = await productsModel.paginate({}, { page, limit })
      console.log(docs);
          // let cars = await productsModel.find({})
          //con el sort 1, ordeno el precio de menor a mayor
          // .sort({price :1})
          return {
            message:"cars list",
            docs,
            payload: docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            length: totalDocs,
          limit: limitPag
          };
        
    } catch (error) {
        throw new Error ("error en el servicio al mostrar los productos")
    }
  };

  async function getProductsByIdService (pid) {
    try {
        const product = await productsModel.findById(pid);
        if (!product) {
          throw new Error ("producto no encontrado" );
        }
        return product
        
    } catch (error) {
        throw new Error ("error en el servicio al mostrar el producto por ID");
    }
  };

  async function getProductsLowerPriceService (queryPrice){
    try {
        let carsLowerPrice;
    if  (queryPrice){
    const prices = parseFloat(queryPrice);
    carsLowerPrice = await productsModel.find({
      price : { $lte: prices}
      
    })
    //ademas le pongo un ordenamiento de precios (de menor a mayor )
    .sort({price :1})
  } else{
    //si no pone nada como query, trae los 10 productos
    carsLowerPrice = await productsModel.find({}).limit(10);
  }
  const carsLowerPriceCount = carsLowerPrice.length;
  return {carsLowerPrice, 
    carsLowerPriceCount}
        
    } catch (error) {
        throw new Error ("error en el servicio al buscar el producto con menor precio");
    }
  };








module.exports ={
    createProductsService,
    getProductsService,
    getProductsByIdService,
    getProductsLowerPriceService
};