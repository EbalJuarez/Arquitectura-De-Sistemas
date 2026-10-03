# Arquitectura-De-Sistemas
## Presentación Personal

* **Nombre:** Ebal Isai Juarez Gonzalez
* **Carnet:** 202408025
* **Semestre:** 6to Semestre

## Ejecución y pruebas de JWT

### 1. Preparar el entorno

```bash
# Crear y activar el entorno virtual
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Instalar dependencias
pip install -r requirements.txt
```

### 2. Configurar la base de datos

```bash
python manage.py migrate
```

Crea un usuario para poder autenticarte (puedes usar un superusuario):

```bash
python manage.py createsuperuser
```

### 3. Ejecutar el servidor

```bash
python manage.py runserver
```

La API queda disponible en `http://localhost:8000/api/`.

### 4. Probar JWT paso a paso

Usa otra terminal (o Postman, Insomnia o Thunder Client) con las credenciales del usuario que creaste.

**a) Verificar que el endpoint está protegido (debe fallar):**

```bash
curl -i http://localhost:8000/api/productos/
```

Resultado esperado: `401 Unauthorized`.

**b) Obtener los tokens:**

```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "mi_usuario", "password": "mi_contraseña"}'
```

Resultado esperado: `200 OK` con los tokens.

```json
{
  "access": "eyJ0eXAiOiJKV1QiLC...",
  "refresh": "eyJ0eXAiOiJKV1QiLC..."
}
```

**c) Acceder a un endpoint protegido con el token de acceso:**

```bash
curl -i http://localhost:8000/api/productos/ \
  -H "Authorization: Bearer <access>"
```

Resultado esperado: `200 OK` con la lista de productos.

**d) Renovar el token de acceso:**

```bash
curl -X POST http://localhost:8000/api/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "<refresh>"}'
```

Resultado esperado: `200 OK` con un nuevo `access`.

**e) Probar casos de error:**

| Prueba | Cómo hacerla | Resultado esperado |
|--------|--------------|--------------------|
| Credenciales incorrectas | `POST /api/token/` con una contraseña errónea | `401` |
| Token inválido | Enviar `Authorization: Bearer abc123` | `401` |
| Sin encabezado | Llamar a `/api/productos/` sin `Authorization` | `401` |
| Token expirado | Esperar a que expire el `access` y usarlo | `401`, luego renovar con `refresh` |

> **Postman / Thunder Client:** en la pestaña *Authorization* elige *Bearer Token* y pega el `access`. Así no tienes que escribir el encabezado manualmente.

### 5. Pruebas automatizadas (opcional)

Crea el archivo `apps/productos/tests.py`:

```python
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase


class JWTAuthTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass123"
        )

    def test_endpoint_protegido_sin_token(self):
        response = self.client.get("/api/productos/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_obtener_token(self):
        response = self.client.post(
            "/api/token/",
            {"username": "testuser", "password": "testpass123"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_credenciales_incorrectas(self):
        response = self.client.post(
            "/api/token/",
            {"username": "testuser", "password": "incorrecta"},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_acceso_con_token(self):
        tokens = self.client.post(
            "/api/token/",
            {"username": "testuser", "password": "testpass123"},
        ).data
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")
        response = self.client.get("/api/productos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_renovar_token(self):
        tokens = self.client.post(
            "/api/token/",
            {"username": "testuser", "password": "testpass123"},
        ).data
        response = self.client.post(
            "/api/token/refresh/", {"refresh": tokens["refresh"]}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
```

Ejecuta las pruebas:

```bash
python manage.py test
```

### Solución de problemas

| Problema | Posible causa |
|----------|---------------|
| `401` al obtener el token | Usuario o contraseña incorrectos |
| `401` con un token válido | Falta el prefijo `Bearer ` (con espacio) en el encabezado |
| `404` en `/api/token/` | Las rutas de JWT no están en `urls.py` |
| `ModuleNotFoundError` | El entorno virtual no está activo o faltan dependencias |
