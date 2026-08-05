import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Productos',
            version: '1.0.0',
            description: 'API REST para gestionar un catálogo de productos'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Servidor local' }
        ]
    },
    // Rutas donde swagger-jsdoc buscará los comentarios @openapi
    apis: ['./src/routes/*.ts']
}

export const swaggerSpec = swaggerJsdoc(options)
