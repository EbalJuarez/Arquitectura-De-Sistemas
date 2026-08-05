# API REST de Productos

API REST construida con Node.js, Express y TypeScript para gestionar un catálogo de productos. Incluye documentación automática de la API mediante Swagger (OpenAPI).
Para visualizar productos:

[http://localhost:3000/api/produc](http://localhost:3000/api/products)

## Requisitos previos

- [Node.js](https://nodejs.org/) v20 o superior
- npm (viene incluido con Node.js)

## Instalación

1. Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone https://github.com/EbalJuarez/Arquitectura-De-Sistemas/tree/hw-02
cd hw-02
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

## Documentación automática de la API (Swagger)

El proyecto genera documentación interactiva a partir de anotaciones `@openapi` presentes en el código de las rutas (`src/routes/products.ts`), usando `swagger-jsdoc` y `swagger-ui-express`.

Con el servidor corriendo, accede a:

```
http://localhost:3000/docs
```

Ahí encontrarás todos los endpoints documentados (parámetros, cuerpos de petición y respuestas esperadas), y podrás probarlos directamente desde el navegador con el botón **"Try it out"**, sin necesidad de usar `curl` o Postman.

> Si agregas o modificas un endpoint, actualiza el comentario `@openapi` correspondiente en `src/routes/products.ts` para que la documentación en `/docs` se mantenga sincronizada con el código.

## Endpoints disponibles

Todos los endpoints están bajo el prefijo `/api/products`.

| Método | Ruta                  | Descripción                              |
|--------|-----------------------|--------------------------------------------|
| GET    | `/api/products`       | Obtiene todos los productos               |
| GET    | `/api/products/:id`   | Obtiene un producto por su id             |
| POST   | `/api/products`       | Crea un nuevo producto                    |
| PUT    | `/api/products/:id`   | Reemplaza un producto completo            |
| PATCH  | `/api/products/:id`   | Actualiza parcialmente un producto        |
| DELETE | `/api/products/:id`   | Elimina un producto                       |

También hay endpoints de utilidad:

| Método | Ruta    | Descripción                                                        |
|--------|---------|----------------------------------------------------------------------|
| GET    | `/ping` | Responde `pong`, útil para verificar que el servidor está activo    |
| GET    | `/docs` | Documentación interactiva de la API (Swagger UI)                    |


## Estructura del proyecto

```
src/
├── index.ts                     # Punto de entrada, monta rutas y /docs
├── swagger.ts                   # Configuración de swagger-jsdoc
├── types.ts                     # Tipos de ProductEntry / NewProductEntry
├── utils.ts                     # Validación y parseo del body de las requests
└── routes/
    ├── products.ts               # Rutas CRUD + anotaciones @openapi
    └── services/
        ├── ProductService.ts     # Lógica de acceso a los datos
        └── Products.json         # Datos de productos (en memoria)
```

## Notas

- Los datos de productos se cargan desde `Products.json` y se mantienen **en memoria**. Al reiniciar el servidor, cualquier cambio (creación, edición o eliminación) hecho durante la ejecución se pierde y vuelve a cargarse el archivo original.
- Este proyecto no tiene tests configurados (`npm test` no ejecuta pruebas reales).
