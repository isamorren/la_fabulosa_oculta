# 🎬 LA FABULOSA OCULTA

Un sitio web de análisis cinematográfico de vanguardia con diseño premio Awwwards.

## 🚀 Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Ejecutar tests
pnpm test

# Linting y formato
pnpm lint
pnpm format
```

## 📁 Estructura del proyecto

```
filmverse/
├── apps/
│   └── web/                    # Aplicación Next.js 15
│       ├── src/
│       │   ├── app/           # App Router
│       │   ├── components/    # Componentes React
│       │   └── lib/          # Utilidades
│       └── content/posts/     # Contenido MDX
├── packages/
│   ├── ui/                    # Componentes compartidos
│   ├── eslint-config/         # Configuración ESLint
│   └── typescript-config/     # Configuración TypeScript
└── turbo.json                 # Configuración Turborepo
```

## 🎨 Personalización

### Colores y tipografía

Edita los tokens de diseño en `packages/ui/src/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... más variables */
}
```

### Fuentes

Modifica las fuentes en `apps/web/src/app/layout.tsx`. Por defecto usa Inter, pero puedes cambiar a cualquier fuente variable de Google Fonts o local.

## 🛠️ Stack tecnológico

- **Next.js 15** con App Router y React Server Components
- **React 19** estable
- **TypeScript** con configuración estricta
- **Tailwind CSS v4** con JIT mode
- **Framer Motion v11** para animaciones
- **GSAP** con ScrollTrigger
- **Three.js** + React Three Fiber para 3D
- **MDX** via Contentlayer para contenido
- **Radix UI** + shadcn/ui para componentes
- **Playwright** + Jest para testing

## 📝 Crear contenido

Añade nuevos posts en `apps/web/content/posts/`:

```mdx
---
title: 'Título del análisis'
film: 'Nombre de la película'
director: 'Director'
year: 2024
rating: 5
publishedAt: 2024-01-01
slug: 'url-slug'
tags: ['tag1', 'tag2']
cover: '/images/cover.jpg'
excerpt: 'Descripción breve'
featured: false
---

Contenido en MDX...
```

## 🚀 Deployment

### Vercel (recomendado)

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Configura las variables de entorno si usas CMS
3. Deploy automático en cada push

### Variables de entorno

```env
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

## 🔧 Scripts disponibles

- `pnpm dev` - Inicia desarrollo con Turbopack
- `pnpm build` - Build de producción
- `pnpm start` - Ejecuta build de producción
- `pnpm lint` - Ejecuta ESLint
- `pnpm format` - Formatea código con Prettier
- `pnpm test` - Ejecuta todos los tests
- `pnpm test:e2e` - Tests E2E con Playwright
- `pnpm test:unit` - Tests unitarios con Jest

## 📦 Extensiones VS Code recomendadas

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- MDX
- Playwright Test for VSCode

## ⚡ Performance

- Core Web Vitals optimizados
- Imágenes AVIF/WebP con LQIP
- Fuentes variables autohospedadas
- Code splitting automático
- PWA con offline support

## 🎯 Características destacadas

- Hero 3D con Three.js (solo desktop)
- Animaciones scroll-driven con GSAP
- Transiciones cinematográficas entre páginas
- Modo oscuro automático
- Film strip loader animado
- Scroll progress indicator
- SEO optimizado con JSON-LD

## 📄 Licencia

MIT
