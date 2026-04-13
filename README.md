# jerecorea

Portfolio personal con backoffice integrado para gestión de proyectos y contenido.

## Tecnologías

- **Frontend:** [Next.js](https://nextjs.org/) 16 con App Router y TypeScript
- **API:** [tRPC](https://trpc.io/) — type-safe de extremo a extremo
- **Base de datos:** MongoDB con Mongoose
- **Estilos:** Tailwind CSS v4
- **Fuentes:** [Bitcount](https://fonts.google.com/specimen/Bitcount+Prop+Single) para títulos, [Sora](https://fonts.google.com/specimen/Sora) para textos

## Desarrollo

Instalar dependencias:

```bash
npm install
```

Copiar variables de entorno:

```bash
cp .env.example .env.local
```

Editar `.env.local` con tu conexión de MongoDB:

```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/?appName=tuapp
```

Cargar datos iniciales:

```bash
npm run seed
```

Iniciar servidor de desarrollo:

```bash
npm run dev
```

## Rutas

### Públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage con grid de proyectos |
| `/proyectos/[slug]` | Página de detalle de proyecto |
| `/sobre-mi` | Página About con contenido editable |

### Backoffice

| Ruta | Descripción |
|------|-------------|
| `/admin` | Dashboard |
| `/admin/proyectos` | Listar y gestionar proyectos |
| `/admin/proyectos/nuevo` | Crear nuevo proyecto |
| `/admin/proyectos/[id]/editar` | Editar proyecto |
| `/admin/configuracion` | Configuración del sitio (nombre, tagline, about, links sociales) |

## Estructura

```
src/
  app/
    (public)/        # Páginas públicas
      page.tsx       # Homepage
      sobre-mi/      # About
      proyectos/     # Detalle de proyecto
    admin/           # Backoffice
      page.tsx       # Dashboard
      proyectos/     # CRUD proyectos
      configuracion/ # Configuración del sitio
    api/trpc/        # API tRPC
    layout.tsx       # Root layout
    globals.css      # Estilos globales
  components/        # Header, Footer, ProjectCard
  lib/               # MongoDB connection, modelos
  server/
    routers/         # tRPC routers (proyectos, settings)
    trpc.ts          # tRPC setup
```

## Contenido editable

Desde el backoffice (`/admin`) puedes:

- Crear, editar y eliminar **proyectos** (título, slug, imagen, descripción, URL externa, orden, destacado)
- Modificar la **configuración del sitio** (nombre, tagline, texto about, links sociales)

## Producción

```bash
npm run build
npm start
```

## Licencia

MIT
