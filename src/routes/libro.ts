import express from 'express'
import * as bookService from './services/LibrosServices'
import toNewBookEntry, { toUpdatedBookEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(bookService.getEntries())
})

router.get('/:id', (req, res) => {
  const book = bookService.findById(+req.params.id)
  return book ? res.json(book) : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newBookEntry = toNewBookEntry(req.body)
    const addedBook = bookService.addEntry(newBookEntry)
    res.status(201).json(addedBook)
  } catch (e) {
    const error = e as Error
    res.status(400).send(error.message)
  }
})

router.put('/:id', (req, res) => {
  try {
    const updatedEntry = toNewBookEntry(req.body)
    const result = bookService.updateEntry(+req.params.id, updatedEntry)
    return result ? res.json(result) : res.sendStatus(404)
  } catch (e) {
    const error = e as Error
    return res.status(400).send(error.message)
  }
})

router.patch('/:id', (req, res) => {
  try {
    const partialEntry = toUpdatedBookEntry(req.body)
    const result = bookService.patchEntry(+req.params.id, partialEntry)
    return result ? res.json(result) : res.sendStatus(404)
  } catch (e) {
    const error = e as Error
    return res.status(400).send(error.message)
  }
})

router.delete('/:id', (req, res) => {
  const deleted = bookService.deleteEntry(+req.params.id)
  return deleted ? res.sendStatus(204) : res.sendStatus(404)
})

export default router