# API REST de Productos

API REST construida con Node.js, Express y TypeScript para gestionar un catálogo de productos.
Para visualizar la API:

http://localhost:3000/api/products

## Requisitos previos

- [Node.js](https://nodejs.org/) v20 o superior
- npm (viene incluido con Node.js)

## Instalación

1. Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone (https://github.com/EbalJuarez/Arquitectura-De-Sistemas/tree/hw-01)
cd hw-01
```

2. Instala las dependencias:

```bash
npm install
```

## Ejecutar en modo desarrollo

Levanta el servidor con recarga automática al detectar cambios:

```bash
npm run dev
```

El servidor quedará corriendo en `http://localhost:3000`.

## Compilar para producción

1. Compila el proyecto TypeScript a JavaScript:

```bash
npm run build
```

Esto genera los archivos compilados en la carpeta `build/`.

2. Ejecuta la versión compilada:

```bash
npm start
```

> ⚠️ Antes de usar `build`/`start` en producción, revisa que `outDir` en `tsconfig.json` apunte a `./build` (no a `./src/`), y que el script `start` en `package.json` sea `node build/index.js`.

## Endpoints disponibles

Todos los endpoints están bajo el prefijo `/api/products`.

| Método | Ruta                  | Descripción                              |
|--------|-----------------------|-------------------------------------------|
| GET    | `/api/products`       | Obtiene todos los productos               |
| GET    | `/api/products/:id`   | Obtiene un producto por su id             |
| POST   | `/api/products`       | Crea un nuevo producto                    |
| PUT    | `/api/products/:id`   | Reemplaza un producto completo            |
| PATCH  | `/api/products/:id`   | Actualiza parcialmente un producto        |
| DELETE | `/api/products/:id`   | Elimina un producto                       |

También hay un endpoint de prueba:

| Método | Ruta    | Descripción                        |
|--------|---------|-------------------------------------|
| GET    | `/ping` | Responde `pong`, útil para verificar que el servidor está activo |

