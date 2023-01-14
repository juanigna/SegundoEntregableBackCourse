import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';


export default class ProductManager {
    constructor(path){
        this.path = path;
    }
    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products    
            }
            return []
        }catch(e){
            console.log(e)
        }

    }
    async addProduct(title, description, price, thumbnail, stock, code){
        try{
            const products =  await this.getProducts();
            if(title.length > 0 && description.length >0 && price > 0 && thumbnail.length >0 && code.length >0 && stock > 0){
                    let prodObj = {
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        id: uuidv4(),
                        code: code,
                        stock: stock
                    }
                    const codeExist = products.some((prod) => prod.code === code);
                    if(codeExist){
                        console.log("Ya existe un producto con el mismo code!")
                        return
                    }
                    products.push(prodObj);
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }else{
                console.log("Debes completar todos los campos!");
            }
        }catch(e){
            console.log(e)
        }
        
    }

    async getProductById(id){
        const products =  await this.getProducts();
        try{
            const prodFound = products.find(product => product.id === id);
            if(!prodFound){
                console.log("Product not found");
                return;
            }else{
                return prodFound;
            }
        }catch(e){
            console.log(e);
        }
    }

    async deleteProduct(id){
        const products =  await this.getProducts();
        try{
            const prodFound = products.find((prod) => prod.id === id);
            if(prodFound){
                const indice = products.indexOf(prodFound);
                products.splice(indice, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t')); //
            }else{
                console.log('Product not found');
            }
        }catch(e){
            console.log(e);
        }
    }

    async updateProduct(idProd, title, description, price, thumbnail, stock, code){
        const products =  await this.getProducts();
        try{
            const productFound = await products.find(products => products.id === idProd);
            if(productFound){
                productFound.title = title;
                productFound.description = description;
                productFound.price = price;
                productFound.thumbnail = thumbnail;
                productFound.code = code;
                productFound.stock = stock;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            }else{
                console.log("Product not found")
            }
        }catch(e){
            console.log(e);
        }
    }
}





