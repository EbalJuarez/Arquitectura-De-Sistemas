import express from 'express'

import ProductsRouter from './routes/products'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req,res) => {
    console.log('Someone pinged here')
    res.send('pong')
})

app.use('/api/products', ProductsRouter)

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})