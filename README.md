# Arquitectura-De-Sistemas

## Presentación Personal

- **Nombre:** Ebal Isai Juarez Gonzalez
- **Carnet:** 202408025
- **Semestre:** 6to Semestre

## Mi primer deployment

Página web sencilla en español, creada con Vite y preparada para publicarse en
Amazon S3 y distribuirse mediante CloudFront.

### Ejecutar localmente

Requiere Node.js 20.

```bash
npm install
npm run dev
```

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

Vite genera el sitio listo para publicar en `dist/`.

### Deployment

El workflow [deploy.yml](./.github/workflows/deploy.yml) se ejecuta en cada
push a la rama `hw-04`. Construye el proyecto con `npm ci` y `npm run build`,
sincroniza `dist/` con el bucket S3 (eliminando archivos antiguos) y solicita
una invalidación `/*` en CloudFront.

Antes de ejecutar el workflow, configura estos GitHub Actions secrets en
**Settings → Secrets and variables → Actions**:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

### Evidencia del deployment

- **URL de CloudFront:** `https://d124oe3b3rex7h.cloudfront.net`
- **Captura de la ejecución exitosa del pipeline:** `<AGREGAR_CAPTURA_DEL_PIPELINE>`
- **Captura de la página funcionando:** `<AGREGAR_CAPTURA_DE_LA_PAGINA>`
