const express = require("express");
const app = express();
const PUERTO = 8080;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const ProductManager = require("../src/controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
});