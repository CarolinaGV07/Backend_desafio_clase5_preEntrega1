import FileManager from './FileManager.js'

export default class CartManager extends FileManager {
    
    constructor() {
        super('./carts.json')
    }

    createCart = async () => {
        try{
            const cart = await this.get()
            const lastCart = (cart.length !== 0) ? cart[cart.length-1].id+1 :1
            const data = {
                id: lastCart,
                products: []
            }
            cart.push(data)
            return await this.set(cart)
        } catch (error) {
            console.error("Cart not created")
            throw error
        }   
    }

    addProduct = async (cid,pid) => {
        const cart = await this.getCart(id)
        const productIn= cart.products.findIndex(p => p.id == pid)
        if(productIn !== -1) {
            cart.products[productIn].quantity += quantity 
        } else{
            cart.products.push({
                product: pid,
                quantity: 1
        })
     
        return await this.update(cart)
        }
    }

    getCart = async (cid) => {
        const cart = await this.get()
        const cartId = cart.find(c => c.id === cid)
        return cartId
        
    }

}
