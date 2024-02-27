const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager-db.js");
const cartManager = new CartManager();

carts = [];

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.log("Error al crear un nuevo carrito", error);
        res.status(500).json({error: "Error del servidor"})
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await cartManager.getCartsById(cartId);
        res.json(carrito.products);
    } catch (error) {
        console.log("Error al cargar el carrito", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.post("/:cid/product/:pid", async(req,res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.put("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const cambio = await productManager.updateProduct(id);
        if(!cambio){
            res.json({
                error: "No se pudo actualizar el producto"
            });
        }else{
            products.push(cambio)
            console.log("Producto actualizado");
        }

    } catch (error) {
        console.log("Error al cargar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.log("Error al cargar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

module.exports = router;