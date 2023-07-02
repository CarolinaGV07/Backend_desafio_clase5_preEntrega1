
import {Router} from 'express'
import ProductManager from '../manager/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req,res) => {
    const result = await productManager.listProducts()
    res.send(result)
})

router.post('/', async (req,res) => {
    const data = req.body
    const result = await productManager.createProduct(data)
    res.send(result)
})

export default router
