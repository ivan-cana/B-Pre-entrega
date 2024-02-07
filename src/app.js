const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const viewsRouter = require("./routes/views.router.js");
const socket = require("socket.io");


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static("./src/public"));

app.use("/", viewsRouter);

const ProductManager = require("../src/controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
});

const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    socket.emit("productos", await productManager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);

        io.socket.emit("productos", await productManager.getProducts());
    })

    socket.on("agregarProducto", async (producto) => {
        await productManager.addProducts(producto);
        io.socket.emit("productos", await productManager.getProducts());
    })
});

