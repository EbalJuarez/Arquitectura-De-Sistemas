import express from 'express'
import * as productServices from './services/ProductService'
const router = express.Router()
import toNewProductEntry from '../utils'

router.get('/', (_req, res) => {
    res.send(productServices.getEntries())
})

router.get('/:id', (req, res) => {
    const products = productServices.findById(+req.params.id)
    return (products != null)
        ? res.send(products)
        : res.sendStatus(404)
})

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

router.put('/:id', (req, res) => {
    try {
        const updatedEntry = toNewProductEntry(req.body)
        const result = productServices.updateEntry(+req.params.id, updatedEntry)

        return (result != null)
            ? res.json(result)
            : res.sendStatus(404)
    } catch (e) {
        const error = e as Error
        res.status(400).send(error.message)
    }
})

router.patch('/:id', (req, res) => {
    try {
        const partialEntry = req.body as Partial<import('../types').NewProductEntry>
        const result = productServices.patchEntry(+req.params.id, partialEntry)

        return (result != null)
            ? res.json(result)
            : res.sendStatus(404)
    } catch (e) {
        const error = e as Error
        res.status(400).send(error.message)
    }
})

router.delete('/:id', (req, res) => {
    const deleted = productServices.deleteEntry(+req.params.id)

    return deleted
        ? res.sendStatus(204)
        : res.sendStatus(404)
})

export default router