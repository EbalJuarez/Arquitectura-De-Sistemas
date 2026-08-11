import { BookEntry, FitnessReport, NewBookEntry } from '../../types'
import initialData from './Libros.json'

let books: BookEntry[] = initialData as BookEntry[]

export const getEntries = (): BookEntry[] => books

export const findById = (id: number): BookEntry | undefined => {
  return books.find(b => b.id === id)
}

export const addEntry = (newBookEntry: NewBookEntry): BookEntry => {
  const nextId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1
  const newBook = {
    id: nextId,
    ...newBookEntry
  }
  books.push(newBook)
  return newBook
}

export const updateEntry = (id: number, updatedFields: NewBookEntry): BookEntry | undefined => {
  const index = books.findIndex(b => b.id === id)
  if (index === -1) return undefined
  const updatedBook = { id, ...updatedFields }
  books[index] = updatedBook
  return updatedBook
}

export const patchEntry = (id: number, partialFields: Partial<NewBookEntry>): BookEntry | undefined => {
  const index = books.findIndex(b => b.id === id)
  if (index === -1) return undefined
  const existing = books[index]
  const patchedBook = { ...existing, ...partialFields, id }
  books[index] = patchedBook
  return patchedBook
}

export const deleteEntry = (id: number): boolean => {
  const index = books.findIndex(b => b.id === id)
  if (index === -1) return false
  books.splice(index, 1)
  return true
}

export const getFitnessReport = (): { isHealthy: boolean; report: FitnessReport } => {
  const totalBooks = books.length
  const borrowedBooks = books.filter(b => b.prestado).length
  const borrowRatio = totalBooks > 0 ? (borrowedBooks / totalBooks) * 100 : 0

  const capacityOk = totalBooks <= 100
  const borrowRatioOk = borrowRatio < 80

  const isHealthy = capacityOk && borrowRatioOk

  const report: FitnessReport = {
    status: isHealthy ? 'Healthy' : 'Degradacion de Calidad',
    totalBooks,
    borrowedBooks,
    borrowRatio: Number(borrowRatio.toFixed(2)),
    checks: {
      capacityOk,
      borrowRatioOk
    }
  }

  return { isHealthy, report }
}