import express from 'express'
import ProductManager from './manager/ProductManager.js'
import productRouter from './routes/product.router.js'

const app = express()
app.use(express.json())

const product = new ProductManager('database.json')

app.use('/api/products', productRouter)

app.get('/products', async (req,res)=>{
    
    const limit = parseInt (req.query.limit)

    const products = await product.listProducts()

    if(limit){
        const limitProds = products.slice(0,limit)

        res.send(limitProds) 
    } else{
        res.send(products)
    }

    })

app.get('/products/:pid', async (req,res)=>{

    const id = parseInt(req.params.pid)

    const productFounded = await product.getProductById(id)
    
    
    if (!productFounded) res.status(404).send({ error: 'Product not found' }) //Es necesario devolver el send con el error 404, que significa que "no existe" el id del producto.
    else res.send(productFounded)
})

app.listen(8080, ()=>{
    console.log('The server is running, oh yeah!!')
})

//Es buena practica usar try/Catch cuando se usa promesas/async await