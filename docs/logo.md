# Logo en el sitio

El sitio usa el logo definido en el **manual de marca v1.1 (2026)**: una huella dibujada con crestas de huella dactilar y el nombre "PET FASHION" en letras propias, con la O en doble anillo dorado.

El manual y el kit completo (todas las composiciones en SVG y PNG, piezas de redes) no viven en este repositorio: están en `PetFashion-Logo-2026.zip`, que conserva el equipo de Pet Fashion. Aquí solo están los archivos que el sitio publica.

## Qué archivo se usa dónde

| Archivo | Qué es | Dónde aparece | Tamaño en pantalla |
|---|---|---|---|
| `images/logo-compacto.svg` | Compacto: huella reducida + nombre, sin descriptor. Versión oscura | Navbar y footer | 36 px de alto (32 px en móvil); 229 px de ancho en el footer |
| `images/isotipo.svg` | Huella completa | Marca de agua del hero, como máscara CSS | 420 a 760 px |
| `images/isotipo-medio.svg` | Huella media, en dorado claro | Tarjeta "Por qué elegirnos" | 68 × 64 px |
| `favicon/favicon.svg`, `favicon.ico`, `favicon-96x96.png` | Huella reducida sobre fondo Noir redondeado | Pestaña del navegador | 16 a 96 px |
| `favicon/apple-touch-icon.png` | Huella media sobre Noir | Acceso directo en iOS | 180 px |
| `favicon/web-app-manifest-192x192.png`, `-512x512.png` | Huella media sobre Noir, dentro de la zona segura de íconos *maskable* | Acceso directo en Android | 192 y 512 px |
| `logo.png` | Composición vertical sobre Noir | Datos estructurados de Google (`"logo"`) | 512 × 512 px |
| `og-image.jpg` | Titular + composición vertical | Vista previa al compartir el enlace | 1200 × 630 px |

## Reglas del manual que el sitio respeta

- **El nombre es un dibujo.** Nunca se escribe "Pet Fashion" con una tipografía para imitar el logo; se usa el archivo.
- **Nivel de detalle según tamaño.** Huella completa desde 120 px, media entre 48 y 120 px, reducida bajo 48 px. Por eso la navbar lleva la reducida y la tarjeta de 64 px lleva la media.
- **Tamaños mínimos.** Las composiciones con el descriptor "Dog Salon · Isla Negra" necesitan al menos 280 px (vertical) o 320 px (horizontal) de ancho. En espacios menores va el compacto, cuyo mínimo es 120 px de ancho.
- **Sin deformar, rotar ni recolorear.** La marca de agua del hero va derecha y se tiñe con `--c-gold-light`.
- **Fondos oficiales.** El sitio usa la versión oscura, siempre sobre `--c-noir`.

## Decisiones de implementación

- **Los logos son archivos, no símbolos del sprite.** El sprite de `index.html` queda para íconos de interfaz que heredan `currentColor`. El logo tiene colores de marca fijos, se cachea como archivo y se referencia con `<img>` (con `width` y `height` para no mover el layout al cargar).
- **`logo-compacto.svg` dibuja el nombre con trazos** (`stroke`) en vez de contornos. Es el mismo dibujo que el kit y pesa 3 KB en lugar de 47 KB. No editar los trazos a mano.
- **La marca de agua usa `mask`.** `hero.css` pinta un bloque dorado y lo recorta con `isotipo.svg`; el color del SVG no importa, solo su forma.
- **Los SVG de la huella están simplificados** a un decimal para la web. Para impresión se usan los del kit.

## Cómo actualizar el logo

1. Exportar desde el kit de marca la pieza que cambia. No redibujar ni retocar los archivos del sitio.
2. Conservar los nombres y tamaños de la tabla: el HTML, `site.webmanifest` y los datos estructurados apuntan a esas rutas.
3. Si cambia la proporción de un SVG, ajustar sus atributos `width` y `height` en `index.html` y la regla correspondiente (`.nav-logo img`, `.footer-brand-logo`, `.why-visual-paw`).
4. Actualizar `<lastmod>` en `sitemap.xml`.

Después de publicar:

- **Favicons:** los navegadores los guardan en caché por días. Para comprobar el cambio, abrir el sitio en una ventana privada.
- **Vista previa en redes:** Facebook y WhatsApp guardan `og-image.jpg`. Se fuerza la actualización pegando la URL del sitio en el [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/) y pulsando "Scrape Again".
