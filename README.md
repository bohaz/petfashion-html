# Pet Fashion Dog Salon — Sitio web

Sitio de una sola página de [Pet Fashion Dog Salon](https://www.petfashiondogsalon.cl), peluquería canina en Isla Negra, Chile. Presenta servicios, precios por talla, galería, reseñas y preguntas frecuentes, y deriva las reservas a WhatsApp.

- **Producción:** https://www.petfashiondogsalon.cl
- **Hosting:** Vercel (despliegue automático desde `main`)
- **Stack:** HTML, CSS y JavaScript sin frameworks ni paso de build

## Estructura

```
petfashion/                 ← raíz que publica Vercel
├── index.html              Página única; cada sección es un <section id="…">
├── css/
│   ├── base.css            Tokens (colores, tipografías, espaciados), reset, utilidades, botones
│   ├── nav.css             Navbar y menú móvil
│   ├── hero.css            Hero y barra de confianza
│   ├── about.css           Nosotros y "Por qué elegirnos"
│   ├── services.css        Tarjetas de servicios
│   ├── pricing.css         Catálogo de precios: tabs, tallas, afilado, adicionales
│   ├── products.css        Cosmética Hydra
│   ├── gallery.css         Galería
│   ├── testimonials.css    Reseñas
│   ├── faq.css             Preguntas frecuentes
│   └── contact-footer.css  Contacto y footer
├── js/
│   ├── main.js             Año del footer, animaciones de entrada, scroll suave
│   ├── nav.js              Navbar al hacer scroll, enlace activo, menú móvil
│   ├── tabs.js             Tabs del catálogo de precios
│   └── faq.js              Acordeón de preguntas frecuentes
├── images/                 Fotos, isotipo y siluetas por talla
├── favicon/                Íconos y site.webmanifest
├── vercel.json             Redirecciones 301 de URLs antiguas a anclas
├── sitemap.xml
└── robots.txt
```

## Desarrollo local

No hay dependencias que instalar. Las rutas de favicon son absolutas (`/favicon/…`), así que conviene servir la carpeta en vez de abrir el archivo directamente:

```bash
python3 -m http.server 3000 --directory petfashion
# o bien: npx serve petfashion
```

Luego abre http://localhost:3000.

## Convenciones

**HTML**
- Sin estilos en línea (`style="…"`) ni bloques comentados: el historial de Git guarda lo eliminado.
- Los íconos viven en el sprite SVG al inicio de `<body>` y se usan con `<svg class="icon"><use href="#ico-nombre"/></svg>`.
- Todo enlace externo lleva `target="_blank" rel="noopener"`.

**CSS**
- Un archivo por sección. Los valores de marca salen de las variables de `base.css` (`--c-gold`, `--f-display`, `--sp-md`…); no se repiten colores ni tipografías a mano.
- Clases con prefijo de sección y modificador con doble guion: `.size-card`, `.size-cards-grid--3`.
- Sin `!important`: los conflictos se resuelven con especificidad.

**JavaScript**
- Cada archivo es un módulo aislado (IIFE con `'use strict'`) que termina sin error si su elemento no existe, de modo que una página nueva puede cargar solo los scripts que necesita.
- Los estados visuales se aplican con clases (`.open`, `.visible`, `.is-active`, `.scrolled`), nunca con estilos desde JS.

## Tareas frecuentes

| Tarea | Dónde |
|---|---|
| Cambiar un precio | `index.html`, sección `#precios`: `.size-price-solo` o `.size-price-val` de la talla |
| Quitar o agregar una talla | Elimina o duplica el bloque `.size-card` del tab. Con 3 tallas el contenedor lleva `size-cards-grid--3`; con 4, solo `size-cards-grid` |
| Agregar un servicio al catálogo | Suma un botón `.cat-tab[data-tab="x"]` y un panel `#tab-x`. Agrega `data-has-addons` al panel si aplican los servicios adicionales. No requiere tocar `tabs.js` |
| Agregar una pregunta frecuente | Duplica un bloque `.faq-item` dentro del `.faq-grid` que corresponda |
| Cambiar el número de WhatsApp | Busca y reemplaza `56945570410` en `index.html` (enlaces `wa.me` y datos estructurados) |
| Agregar una redirección | `vercel.json` |

Después de cambiar contenido visible, actualiza `<lastmod>` en `sitemap.xml`.

## Despliegue

Vercel publica la carpeta `petfashion/` (Root Directory del proyecto):

- Cada push a `main` despliega a producción.
- Cada pull request genera una URL de vista previa para revisar antes de fusionar.

## Flujo de trabajo en Git

`main` siempre refleja producción; los cambios entran por pull request.

**1. Crear la rama** desde `main` actualizado, con el formato `tipo/descripcion-corta`:

```bash
git checkout main
git pull origin main
git checkout -b feat/pagina-el-quisco
```

| Tipo | Uso |
|---|---|
| `feat` | Sección, página o funcionalidad nueva |
| `fix` | Corrección de un error |
| `content` | Precios, textos o imágenes |
| `style` | Ajustes visuales sin cambio de comportamiento |
| `refactor` | Reorganización de código sin cambio visible |
| `chore` | Configuración, documentación, limpieza |

**2. Hacer commit** con un mensaje en imperativo que empiece por el tipo:

```bash
git add -A
git commit -m "content: update Fashion Full prices"
```

**3. Subir la rama y abrir el pull request:**

```bash
git push -u origin feat/pagina-el-quisco
gh pr create --base main --fill   # o desde github.com con el botón "Compare & pull request"
```

La descripción del PR sigue la plantilla de `.github/pull_request_template.md`: qué cambia, por qué y cómo se probó.

**4. Revisar** la vista previa de Vercel enlazada en el PR, en escritorio y en móvil.

**5. Fusionar y limpiar:**

```bash
gh pr merge --squash --delete-branch   # o "Squash and merge" en github.com
git checkout main
git pull origin main
```

**Si algo sale mal en producción**, revierte el commit de fusión y Vercel vuelve a publicar la versión anterior:

```bash
git revert <hash-del-commit>
git push origin main
```

## Pendientes conocidos

- `og-image.jpg` y `logo.png`, referenciados en las metaetiquetas Open Graph y en los datos estructurados, no están en el repositorio. Sin ellos los enlaces compartidos en redes no muestran imagen.
- `groomer-1.png` y `groomer-2.png` pesan 600 KB y 400 KB; convertirlos a WebP reduciría el peso de la página.
- `images/Cuchilla.webp` e `images/Isotipo2.png` no se usan en el sitio.
