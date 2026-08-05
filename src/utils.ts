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

export default toNewProductEntry