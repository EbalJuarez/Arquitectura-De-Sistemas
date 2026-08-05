import express from 'express'
import swaggerUi from 'swagger-ui-express'

import ProductsRouter from './routes/products'
import { swaggerSpec } from './swagger'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
    console.log('Someone pinged here')
    res.send('pong')
})

app.use('/api/products', ProductsRouter)

// Documentación automática de la API (Swagger)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})