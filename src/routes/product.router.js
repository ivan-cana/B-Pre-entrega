const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager-db.js");
const productManager = new ProductManager();

products = [];

router.get("/api/products", (req, res) => {
    res.json(products);
})

router.get("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const producto = await productManager.getProductsById(id);
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

router.get("/api/products", async (req, res) => {
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

router.post("/api/products", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await productManager.addProducts(nuevoProducto);
        res.status(201).json({
            message: "Producto agregado con exito"
        });
    } catch (error) {
        console.log("Error al agregar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
});

router.put("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;
    const productoActualizado = req.body

    try {
        await productManager.updateProduct(id, productoActualizado);
        res.json({
            message: "Producto actualizado con exito"
        });
    } catch (error) {
        console.log("Error al actualizar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

router.delete("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        await productManager.deleteProduct(id);
        res.json({
            message: "Producto eliminado con exito"
        })
    } catch (error) {
        console.log("Error al eliminar el producto", error);
        res.status(500).json({error: "Error del servidor"})
    }
})

module.exports = router;