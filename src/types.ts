
export interface ProductEntry {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  imagen: string;
}

export type ProductList = ProductEntry[];

export type NewProductEntry = Omit<ProductEntry, 'id'>