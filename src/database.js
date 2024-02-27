const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ivancana08:coderhouse@cluster0.pmvrwyn.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa"))
    .catch(() => console.log("Error en la conexion"))