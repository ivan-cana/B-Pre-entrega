const fs = require("fs") .promises;

class ProductManager {

    static contId = 0;

    constructor(path){
        this.products = [];
        this.path = path;
    }

    async addProducts({title, description, price, img, code, stock}){
        if(!title || !description || !price || !img || !code || !stock){
            console.log("Todos los campos son obligatorios");
            return;
        }

        if(this.products.some( item => item.code === code)){
            console.log("El codigo no puede repetirse");
            return;
        }

        const newProduct = {
            id: ++ProductManager.contId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);
    }

    async leerArchivo(){
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer");
        }
    }

    async guardarArchivo(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar", error)
        }
    }

    async getProducts(){
        await this.leerArchivo();
    }

    async getProductsById(id){
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);
            if(buscado){
                return buscado;
            } else {
                console.log("El producto no existe");
            }
        } catch (error) {
            console.log("Error al buscar el producto", error);
        }        
    }

    async updateProduct(id, campo, nuevoContenido){
        const arrayProductos = await this.leerArchivo();
        const buscado = arrayProductos.find(item => item.id === id);

        switch (campo) {
            case title:
                buscado.title = nuevoContenido;
                break;

            case description:
                buscado.description = nuevoContenido;
                break;

            case price:
                buscado.price = nuevoContenido;
                break;

            case img:
                buscado.img = nuevoContenido;
                break;

            case code:
                buscado.code = nuevoContenido;
                break;

            case stock:
                buscado.stock = nuevoContenido;
                break;
        }   

        await this.guardarArchivo(this.products);
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const newArrayProductos = arrayProductos.filter(item => item.id !== id);
    
            if (newArrayProductos.length < arrayProductos.length) {
                await this.guardarArchivo(newArrayProductos);
                console.log("Producto eliminado exitosamente");
            } else {
                console.log("El producto no existe");
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error);
        }
    }
}

module.exports = ProductManager;