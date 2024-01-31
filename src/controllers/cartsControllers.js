const fs = require('fs/promises');

async function postCart(req, res) {
  const newCart = {
    id: Date.now().toString(),
    products: [],
  };

  try {
    const cartsData = await fs.readFile(__dirname + '/../data/carrito.json', 'utf-8');

    const carts = JSON.parse(cartsData);

    carts.push(newCart);
    await fs.writeFile('data/carrito.json', JSON.stringify(carts, null, 2));

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo carrito' });
  }
}

async function getCartId(req, res) {
  const cartId = req.params.cid;

  try {
    const cartsData = await fs.readFile('data/carrito.json', 'utf-8');
    const carts = JSON.parse(cartsData);

    const cart = carts.find(c => c.id == cartId);

    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

module.exports = {
    postCart,
    getCartId,

}