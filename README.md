# ITAlumni

Plataforma web para exalumnos de la **IT Academy** (Barcelona Activa): una comunidad
donde los antiguos alumnos pueden conectar entre ellos, compartir su experiencia y
descubrir oportunidades laborales del sector digital.

Proyecto formativo del **sprint 2** del curso. La interfaz está en catalán.

> **Estado:** maquetación completa de las cuatro páginas y función de búsqueda
> operativa. Los tests unitarios están empezados (ver [Tests](#tests)).

---

## Alcance

Es un proyecto de **front-end estático**. No hay backend, ni base de datos, ni
framework de UI, ni paso de compilación. El trabajo consiste en:

1. **HTML** — maquetación siguiendo el diseño de Figma.
2. **CSS** — estilos siguiendo el diseño de Figma, con enfoque *mobile-first*.
3. **JavaScript** — la función de búsqueda de alumni.
4. **Tests unitarios** sobre los escenarios Gherkin del anexo 5.

Los botones que no forman parte de ese alcance (login, conectar, inscribirse a una
oferta, newsletter…) están maquetados pero no tienen funcionalidad.

---

## Páginas

| Archivo | Página |
|---|---|
| `index.html` | Landing pública: presentación, beneficios y testimonios |
| `register.html` | Formulario de registro |
| `network.html` | Xarxa de alumni — **búsqueda y filtros funcionando** |
| `jobs.html` | Portal de ofertas de trabajo |

Cada página tiene un diseño distinto para móvil y para escritorio, siguiendo los
mockups de Figma (no es la misma pantalla adaptada: en móvil hay barra de pestañas
inferior y cabecera con flecha de "atrás"; en escritorio hay un header completo).

---

## Cómo ejecutarlo

**Importante:** no sirve abrir los `.html` con doble clic. `network.html` carga el
JavaScript como módulo ES (`<script type="module">`), y los módulos no funcionan
desde `file://` — el navegador da un error de CORS. Hay que servir la carpeta:

```bash
npx serve
```

O bien usar la extensión **Live Server** de VS Code (botón *Go Live*).

---

## Tests

Se usa [Vitest](https://vitest.dev/).

```bash
npm install       # solo la primera vez
npm test          # una pasada
npm run test:watch  # se relanza al guardar
```

Los tests van sobre `src/js/alumni-search.js`, que es **lógica pura**: recibe datos y
devuelve datos, sin tocar el DOM. Por eso se puede probar sin navegador.

La estructura sigue los escenarios Gherkin del anexo 5 para que se vea qué test
cubre qué requisito: `describe` = *Feature*, `it` = *Scenario*, y dentro el patrón
*Given / When / Then*. Cada test define sus propios datos de ejemplo, así que no se
rompen al cambiar los datos de la web.

**Cobertura actual:** 1 escenario (búsqueda por nombre). Pendientes: búsqueda sin
resultados, búsqueda por empresa y ubicación, y el orden de los tres filtros.

---

## Estructura

```
index.html  register.html  network.html  jobs.html

src/
├── css/
│   └── style.css              todo el CSS, organizado por página
├── js/
│   ├── alumni-search.js       lógica pura: buscar y ordenar (lo que se testea)
│   ├── network-filters.js     capa DOM: lee el input, llama a la lógica, pinta
│   ├── alumni-search.test.js  tests
│   └── network-filters.ts     copia en TypeScript, solo como ejercicio (*)
└── assets/
    ├── icons/                 logos y favicon
    └── img/                   fotos de ofertas y testimonios

anexos/                        documentación del proyecto (en catalán)
```

(*) `network-filters.ts` **no se compila ni se usa**. Es un ejercicio de aprendizaje.
El archivo que carga la web es el `.js`.

### Los anexos

Definen el proyecto y son la referencia de lo que hay que construir:

| Anexo | Contenido |
|---|---|
| 1 | Briefing: contexto, público objetivo, requisitos |
| 2 | Análisis funcional: épicas, sitemap, user journeys |
| 3 | Diseño UX/UI y **enlace a Figma** |
| 4 | Alcance del MVP |
| 5 | Historias de usuario y **escenarios Gherkin** (base de los tests) |

---

## Decisiones técnicas

**Un solo archivo CSS**, dividido por páginas con comentarios. El proyecto es
pequeño y sin build varios archivos obligarían a varios `<link>`.

**Mobile-first.** Los estilos base son los de móvil y las media queries usan
`min-width` para ir añadiendo lo de pantalla grande. Los cortes son 768px (tableta)
y 1024px (escritorio).

**Dos técnicas para móvil/escritorio**, según el caso:
- Clases `only-mobile` / `only-desktop` cuando el bloque es completamente distinto
  (las dos cabeceras, la barra de pestañas).
- Media queries cuando es el mismo bloque que cambia (la rejilla de tarjetas pasa de
  1 a 2 a 4 columnas).

**`html { font-size: 62.5% }`** para que `1rem = 10px` y las medidas en `rem` sean
fáciles de calcular. Se usa `rem` en vez de `px` para respetar el tamaño de letra
que el usuario tenga configurado en su navegador.

**Variables CSS en `:root`** para colores, tipografías y radios: la identidad visual
está definida en un solo sitio.

**El JavaScript está partido en dos archivos** a propósito: la lógica pura separada
de la manipulación del DOM. Esa separación es lo que permite testear la búsqueda sin
montar un navegador falso.

**Accesibilidad:** etiquetas semánticas, `alt` en las imágenes, `aria-label` en los
enlaces que solo llevan icono, y foco visible al navegar con teclado.

---

## Diseño

Los mockups, wireframes y el design system están en Figma:

[**Proyecto ITAlumni en Figma**](https://www.figma.com/design/pZkXuXJxfMEPzX3tyglYhm/ITAlumni?node-id=0-1)

Tipografías: **Inter** (cuerpo) y **Poppins** (títulos).
Paleta: magenta/púrpura con gradiente sobre fondo claro.
