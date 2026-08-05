import { NewProductEntry, ProductEntry } from '../../types'
import ProductData from './Products.json'

const products: ProductEntry[] = ProductData as ProductEntry[]
export const getEntries = (): ProductEntry[] => products

export const findById = (id: number): ProductEntry | undefined => {
    const entry = products.find(d => d.id == id)
    return entry
}

export const addEntry = (newProductEntry: NewProductEntry): ProductEntry => {
    const newProduct = {
        id: Math.max(...products.map(d => d.id)) + 1,
        ...newProductEntry
    }
    products.push(newProduct)
    return newProduct
}

export const updateEntry = (id: number, updatedFields: NewProductEntry): ProductEntry | undefined => {
    const index = products.findIndex(d => d.id == id)
    if (index === -1) return undefined

    const updatedProduct = { id, ...updatedFields }
    products[index] = updatedProduct
    return updatedProduct
}

export const patchEntry = (id: number, partialFields: Partial<NewProductEntry>): ProductEntry | undefined => {
    const index = products.findIndex(d => d.id == id)
    if (index === -1) return undefined

    const existing = products[index]
    if (!existing) return undefined

    const patchedProduct = { ...existing, ...partialFields, id }
    products[index] = patchedProduct
    return patchedProduct
}

export const deleteEntry = (id: number): boolean => {
    const index = products.findIndex(d => d.id == id)
    if (index === -1) return false

    products.splice(index, 1)
    return true
}