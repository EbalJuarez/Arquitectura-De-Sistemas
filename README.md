# Arquitectura-De-Sistemas
## Presentación Personal

* **Nombre:** Ebal Isai Juarez Gonzalez
* **Carnet:** 202408025
* **Semestre:** 6to Semestre

  # Guía de Ejecución de la API

## 1. Instalación de Dependencias

Antes de ejecutar el proyecto por primera vez, instala todos los módulos necesarios:

```bash
npm install
```

---

## 2. Ejecución en Modo Desarrollo

Para trabajar en el proyecto con recarga automática (*hot-reload*) al guardar cambios:

```bash
npm run dev
```

> **Nota:** No es necesario compilar el proyecto manualmente para este modo.

---

## 3. Compilación y Ejecución en Producción

Para compilar el código de TypeScript a JavaScript y ejecutar el servidor compilado:

```bash
# 1. Compilar el proyecto (genera la carpeta build/dist)
npm run build

# 2. Iniciar el servidor con el código compilado
npm start
```

---

---

---

## 4. Pruebas e Interacción con los Endpoints

La API expone los siguientes endpoints principales bajo la dirección base `http://localhost:3000`:

### **Gestión de Libros (`/books`)**

* **Obtener todos los libros:**
  ```text
  GET http://localhost:3000/books
  ```
  *Devuelve el listado completo de los libros registrados.*

* **Obtener un libro por ID:**
  ```text
  GET http://localhost:3000/books/1
  ```
  *Reemplaza `1` por el ID del libro que deseas consultar.*

* **Crear un nuevo libro:**
  ```text
  POST http://localhost:3000/books
  ```
  *Cuerpo de la petición (`Content-Type: application/json`):*
  ```json
  {
    "titulo": "El Aleph",
    "autor": "Jorge Luis Borges",
    "descripcion": "Colección de cuentos",
    "categoria": "Ficción",
    "imagen": "[https://example.com/imagen.jpg](https://example.com/imagen.jpg)",
    "prestado": false
  }
  ```

* **Actualizar un libro:**
  ```text
  PUT http://localhost:3000/books/1
  ```

* **Eliminar un libro:**
  ```text
  DELETE http://localhost:3000/books/1
  ```

---

### **Métricas y Estado de Salud (`/health/fitness`)**

* **Evaluación del sistema:**
  ```text
  GET http://localhost:3000/health/fitness
  ```
  *Ejecuta la función de aptitud de la API y devuelve un reporte del estado de salud (`HEALTHY` o `DEGRADED`) junto con la respuesta HTTP (`200` o `503`).*

---

### Ejemplos de prueba desde la terminal (cURL)

```bash
# Consultar todos los libros
curl -X GET http://localhost:3000/books

# Consultar un libro específico
curl -X GET http://localhost:3000/books/1

# Verificar la salud de la API
curl -X GET http://localhost:3000/health/fitness
```
