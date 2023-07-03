import FileManager from './FileManager.js'

export default class ProductManager extends FileManager{
    constructor () {  
        super('./database.json') 
    }

    createProduct = async ({title, description,code,price,status,stock, category,thumbnail}) => {
        
        if(!title || !description || !code || !price || !status || !stock || !category){ //Sin validar thumbnail, y pide que sea un array de strings
            console.log("All fields must be completed") //Status es true por defecto?
            return false 
        }
        

        const products = await this.listProducts()
        const invalidCode = products.some(prod => prod.code === code)
        if(invalidCode){
            console.error("Code entered has already been used")
        }

        const product = {title, description, code, price, status, stock, category, thumbnail, id: await this.getId()}
        console.log(product.thumbnail)
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
            console.error("File not found")
            return []
        }

    }

    getProductById = async (productId) => {

        const dateId = await this.listProducts()
        const findProduct = dateId.find((prod) => prod.id === productId);
        if(findProduct){
            return findProduct
        } else {
            return "Not found"
        }

    }

    updateProduct = async (id,productObj) => {
        const upProd = await this.listProducts()
        const productIndex = upProd.findIndex((prod) => prod.id === id)
        if(!productIndex === -1){
            return "Product not updated"
             
        }
        const updateProducts = upProd.map((product) =>{
            if(product.id===id){
                return {...product,...productObj}
    
            }
                return product
        })
        const result = await this.update(updateProducts)
        return (result, "Register updated successfully")
    }

    deleteProduct = async (productId) => {

        const delProd = await this.listProducts()
        const prodExist = delProd.findIndex((prod) => prod.id === productId)
        if(prodExist === -1){
            return "Product doesn`t exist"
            
        }

        const deleteProduct = delProd.filter((prod) => prod.id !== productId)

        const result = await this.delete(deleteProduct)
        return (result, "Register deleted successfully")
    }
}