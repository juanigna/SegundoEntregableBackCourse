import ProductManager from "./class/Ejercicio2.js";

let productManager = new ProductManager('./files/products.json');

const Products = async () => {
 //Empezar a utilizar el productManager 
 await productManager.updateProduct("38745c34-4449-4520-9f31-62cc19287474", {title:"Compu rizen 3500"})
}

Products();