import express from 'express'
import * as productServices from './services/ProductService'
const router = express.Router()
import toNewProductEntry, { toUpdatedProductEntry } from '../utils'

/**
 * @openapi
 * components:
 *   schemas:
 *     ProductEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Laptop HP Pavilion 15
 *         descripcion:
 *           type: string
 *           example: Laptop con procesador Intel Core i5, 8GB RAM, 512GB SSD
 *         precio:
 *           type: number
 *           example: 899.99
 *         categoria:
 *           type: string
 *           example: Electrónica
 *         stock:
 *           type: integer
 *           example: 15
 *         imagen:
 *           type: string
 *           example: https://example.com/images/laptop-hp.jpg
 *     NewProductEntry:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - precio
 *         - categoria
 *         - stock
 *         - imagen
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         precio:
 *           type: number
 *         categoria:
 *           type: string
 *         stock:
 *           type: integer
 *         imagen:
 *           type: string
 */

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductEntry'
 */
router.get('/', (_req, res) => {
    res.send(productServices.getEntries())
})

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductEntry'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', (req, res) => {
    const products = productServices.findById(+req.params.id)
    return (products != null)
        ? res.send(products)
        : res.sendStatus(404)
})

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductEntry'
 *     responses:
 *       200:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductEntry'
 *       400:
 *         description: Datos inválidos o incompletos
 */
router.post('/', (req, res) => {
    try {
        const newProductEntry = toNewProductEntry(req.body)
        const addedProductEntry = productServices.addEntry(newProductEntry)
        res.json(addedProductEntry)
    } catch (e) {
        const error = e as Error
        res.status(400).send(error.message)
    }
})

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Reemplaza un producto completo
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductEntry'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductEntry'
 *       400:
 *         description: Datos inválidos o incompletos
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', (req, res) => {
    try {
        const updatedEntry = toNewProductEntry(req.body)
        const result = productServices.updateEntry(+req.params.id, updatedEntry)

        return (result != null)
            ? res.json(result)
            : res.sendStatus(404)
    } catch (e) {
        const error = e as Error
        return res.status(400).send(error.message)
    }
})

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     summary: Actualiza parcialmente un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Solo incluye los campos que quieras actualizar
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductEntry'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto no encontrado
 */
router.patch('/:id', (req, res) => {
    try {
        const partialEntry = toUpdatedProductEntry(req.body)
        const result = productServices.patchEntry(+req.params.id, partialEntry)

        return (result != null)
            ? res.json(result)
            : res.sendStatus(404)
    } catch (e) {
        const error = e as Error
        return res.status(400).send(error.message)
    }
})

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', (req, res) => {
    const deleted = productServices.deleteEntry(+req.params.id)

    return deleted
        ? res.sendStatus(204)
        : res.sendStatus(404)
})

export default router