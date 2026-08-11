export interface BookEntry {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  prestado: boolean; // Campo clave para el endpoint /health/fitness
}

export type BookList = BookEntry[];
export type NewBookEntry = Omit<BookEntry, 'id'>;

export interface FitnessReport {
  status: 'Healthy' | 'Degradacion de Calidad';
  totalBooks: number;
  borrowedBooks: number;
  borrowRatio: number;
  checks: {
    capacityOk: boolean; // < 100 libros
    borrowRatioOk: boolean; // < 80% prestados
  };
}