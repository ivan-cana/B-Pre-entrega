const express = require("express");
const app = express();
const PUERTO = 8080;

const ProductManager = require("../src/controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

app.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();

        if(limit){
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }

    } catch (error) {
        console.log("Error al cargar los productos", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

app.get("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const producto = await productManager.getProductsById(parseInt(id));
        if(!producto){
            res.json({
                error: "Producto no encontrado"
            });
        }else{
            res.json(producto);
        }

    } catch (error) {
        console.log("Error al cargar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

app.listen(PUERTO);