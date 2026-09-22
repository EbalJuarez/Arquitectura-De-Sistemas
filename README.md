# Arquitectura-De-Sistemas
## Presentación Personal

* **Nombre:** Ebal Isai Juarez Gonzalez
* **Carnet:** 202408025
* **Semestre:** 6to Semestre
## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone <url-del-repositorio>
cd django_test

### 2. Crear y activar el entorno virtual

python -m venv env

En Windows (PowerShell):
.\env\Scripts\Activate.ps1

### 3. Instalar dependencias

pip install -r requirements.txt

### 4. Aplicar las migraciones

python manage.py migrate

### 5. Crear un superusuario (para entrar al admin)

python manage.py createsuperuser

### 6. Levantar el servidor

python manage.py runserver

Luego abre en el navegador:
- Sitio: http://127.0.0.1:8000/
- Admin: http://127.0.0.1:8000/admin/

### Nota

Este repositorio incluye un hook de Git (`post-merge`) que aplica las
migraciones automáticamente después de cada `git pull`. Si al clonar
el hook no se activó solo, ejecuta una vez:

git config core.hooksPath hooks
