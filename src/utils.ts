import { NewBookEntry } from './types'

const parseString = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Incorrect or missing string')
  }
  return stringFromRequest
}

const parseNumber = (numberFromRequest: any): number => {
  if (!isNumber(numberFromRequest)) {
    throw new Error('Incorrect or missing number')
  }
  return Number(numberFromRequest)
}

const parseBoolean = (boolFromRequest: any): boolean => {
  if (typeof boolFromRequest !== 'boolean') {
    throw new Error('Incorrect or missing boolean field')
  }
  return boolFromRequest
}

const isString = (text: any): boolean => {
  return typeof text === 'string' || text instanceof String
}

const isNumber = (value: any): boolean => {
  if (value === null || value === undefined || value === '') return false
  return !isNaN(Number(value))
}

const toNewBookEntry = (object: any): NewBookEntry => {
  const newBook: NewBookEntry = {
    titulo: parseString(object.titulo),
    autor: parseString(object.autor),
    descripcion: parseString(object.descripcion),
    categoria: parseString(object.categoria),
    imagen: parseString(object.imagen),
    prestado: parseBoolean(object.prestado ?? false) // Si no se envía, por defecto es false
  }
  return newBook
}

export const toUpdatedBookEntry = (object: any): Partial<NewBookEntry> => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  const updated: Partial<NewBookEntry> = {}

  if ('titulo' in object) updated.titulo = parseString(object.titulo)
  if ('autor' in object) updated.autor = parseString(object.autor)
  if ('descripcion' in object) updated.descripcion = parseString(object.descripcion)
  if ('categoria' in object) updated.categoria = parseString(object.categoria)
  if ('imagen' in object) updated.imagen = parseString(object.imagen)
  if ('prestado' in object) updated.prestado = parseBoolean(object.prestado)

  return updated
}

export default toNewBookEntry