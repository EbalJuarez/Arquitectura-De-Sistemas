import { NewProductEntry } from "./types";
const parseString = (StringFromRequest: any): string =>{
    if (!isString (StringFromRequest)){
        throw new Error('Incorrect or missing string')
    }
    return StringFromRequest
}

const parseNumber = (numberFromRequest: any): number => {
  if (!isNumber(numberFromRequest)) {
    throw new Error('Incorrect or missing number');
  }
  return Number(numberFromRequest);
}

const isNumber = (value: any): value is number => {
  if (value === null || value === undefined || value === '') return false;
  
  return !isNaN(Number(value));
}

const isString = (string: string): boolean => {
    return typeof string == 'string' 

}

const toNewProductEntry = (object: any): NewProductEntry => {
    const newProduct: NewProductEntry = {
        nombre: parseString(object.nombre),
        descripcion: parseString(object.descripcion),
        precio: parseNumber(object.precio),
        categoria: parseString(object.categoria),
        stock: parseNumber(object.stock),
        imagen: parseString(object.imagen)

    }
    return newProduct
}

export const toUpdatedProductEntry = (object: any): Partial<NewProductEntry> => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }

    const updated: Partial<NewProductEntry> = {}

    if ('nombre' in object) updated.nombre = parseString(object.nombre)
    if ('descripcion' in object) updated.descripcion = parseString(object.descripcion)
    if ('precio' in object) updated.precio = parseNumber(object.precio)
    if ('categoria' in object) updated.categoria = parseString(object.categoria)
    if ('stock' in object) updated.stock = parseNumber(object.stock)
    if ('imagen' in object) updated.imagen = parseString(object.imagen)

    return updated
}

export default toNewProductEntry