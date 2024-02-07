const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");


router.get("/", async(req, res) => {
    try {
        const productos = await productManager.getProducts();
        res.render("home", {productos: productos})
    } catch (error) {
        console.log("Error al cargar la lista de productos", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.get("/realtimeproducts", async(req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        console.log("Error en la vista real time", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

module.exports = router;