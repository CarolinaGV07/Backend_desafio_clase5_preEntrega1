import FileManager from './FileManager.js'

export default class CartManager extends FileManager {
    
    constructor() {
        super('./carts.json')
    }

    cartCreate = async (data) => {
        const result = await this.set(data)
        return result
    }

    cartList = async () => {
        const result = await this.get()
        return result
    }

}

