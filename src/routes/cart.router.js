
import {Router} from 'express'
import CartManager from '../manager/CartManager.js'

const router = Router()
const cartManager = new CartManager()


router.get('/cid', async (req,res) => {
    const cid = parseInt(req.params.cid)
    const productsInCart = await cartManager.listCarts(cid)
    res.send(productsInCart)
})

router.post('/', async (req,res) => {
    const data = req.body
    const result = await cartManager.createCart(data)
    res.send(result)
})

router.post('/cid/product/pid', async (req,res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    const productToCart = await cartManager.addProduct(cid,pid) //Solo ID del producto, y quantity? y como la incremento si se agrega otro producto igual?
    res.send(productToCart)
})

export default router