const fs = require('fs/promises');
const path = require('path');

async function postCart(req, res) {
  const newCart = {
    id: Date.now().toString(),
    products: [],
  };

  try {
    const filePath = path.resolve(__dirname, '..', 'data', 'carrito.json');

    const cartsData = await fs.readFile(filePath, 'utf-8');
    await fs.writeFile(filePath, JSON.stringify(carts, null, 2));

    let carts;
try {
  carts = JSON.parse(cartsData);
} catch (parseError) {
  console.error('Error al analizar el contenido del archivo JSON:', parseError);
  return res.status(500).json({ error: 'Error en el formato del archivo JSON' });
}

    carts.push(newCart);
    await fs.writeFile('data/carrito.json', JSON.stringify(carts, null, 2));

    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo carrito' });
  }
}

async function getCartId(req, res) {
    const cartId = req.params.cid;
  
    try {
      const filePath = path.resolve(__dirname, '..', 'data', 'carrito.json');
  
      // Leer el contenido del archivo antes de escribir en él
      const cartsData = await fs.readFile(filePath, 'utf-8');
      
      // Parsear el contenido del archivo JSON en un array de carritos
      let carts;
      try {
        carts = JSON.parse(cartsData);
      } catch (error) {
        console.error( 'Error al analizar el contenido del archivo JSON:' );
        return res.status(500).json({ error: 'Error en el formato del archivo JSON' });
      }
  
      //  buscar el carrito por su ID
      const cart = carts.find((cart) => cart.id === cartId);
  
      if (cart) {
        res.status(208).json(cart.products);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      //  escribe los cambios de vuelta al archivo
      await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el carrito' });
    }
  }
module.exports = {
    postCart,
    getCartId,

}