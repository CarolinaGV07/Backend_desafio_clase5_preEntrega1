
import fs from 'fs'
import FileManager from './FileManager.js'

export default class ProductManager extends FileManager{
    constructor () {  
        super('./database.json') 
        this.id = 0
    }

    createProduct = async ({title, description,price,thumbnail,stock,code}) => {
        
        if(!title || !description || !price || !thumbnail || !stock || !code){
            console.log("All fields must be completed")
            return false 
        }
        

        const products = await this.listProducts()
        console.log(products)
        const invalidCode = products.some(prod => prod.code === code)
        if(invalidCode){
            console.error("Code entered has already been used")
        }

        const product = {title, description, price, thumbnail, stock, code, id: await this.getId()}
        const list = await this.listProducts()
        list.push(product)

        
        const result = await this.set(list)
        return (result, "Product created correctly")
    }

    listProducts = async () => {
        try{
            const result = await this.get()
            return result
        } catch (error) {
            console.error('File not found')
            return []
        }

    }

    getId =async () => {
        const products = await this.listProducts()
        const count = products.length
        return (count > 0) ? products[count - 1].id +1 :1 

    }

    getProductById = async (productId) => {

        const dateId = await this.listProducts()
        const findProduct = dateId.find((prod) => prod.id === productId);
        if(findProduct){
            return findProduct
        } else {
            console.error ("Not found")
        }

    }

    updateProduct = async (id,productObj) => {
        const upProd = await this.listProducts()
        const productIndex = upProd.findIndex((prod) => prod.id === id)
        if(!productIndex === -1){
            console.error('Product not updated')
            return; 
        }
        const updateProducts = upProd.map((product) =>{
            if(product.id===id){
                return {...product,...productObj}
    
            }
                return product
        })

        fs.promises.writeFile(this.path,JSON.stringify(updateProducts),'utf-8')
        //return o console.log "Registro actualizado correctamente" , esto seria muy buena practica y muy importante 
    }


    
    deleteProduct = async (productId) => {

        const delProd = await this.listProducts()
        const prodExist = delProd.findIndex((prod) => prod.id === productId)
        if(prodExist === -1){
            console.error('El producto no existe')
            return;
        }

        const deleteProduct = delProd.filter((prod) => prod.id !== productId)

        await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct),'utf-8')
        //return o console.log "Registro eliminado correctamente" , esto seria muy buena practica y muy importante 
    }
}