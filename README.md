# 🧪 Prueba Técnica Full Stack - PokeApp

Este proyecto es una aplicación web que permite consultar información sobre Pokémon usando la [PokeAPI](https://pokeapi.co/). Está desarrollada con **Nest.js** para el backend y **Next.js** para el frontend, cumpliendo con los requisitos de la prueba técnica Full Stack.

La aplicación permite:
- Buscar Pokémon por ID o nombre.
- Mostrar información detallada: nombre, tipo, habilidades y sprite.
- Ver evoluciones relacionadas.
- Ver otros Pokémon aleatorios.
- Diseño completamente responsive.
- Interfaz inspirada en la estética del mundo Pokémon.

---

## 🛠️ Tecnologías utilizadas

| Parte      | Stack       |
|------------|-------------|
| Backend    | Nest.js     |
| Frontend   | Next.js (React) |
| DB         | (No requerida) |
| API        | PokeAPI     |
| Deploy     | Vercel (Frontend), localhost:3000 (Backend) |
| Docker     | ❌ No dockerizado (se explica por qué) |

---

## 📦 Estructura del Proyecto (Frontend)


---

## 🎯 Objetivo de la prueba

> Crear una aplicación web que consuma la PokeAPI y muestre información de Pokémon con las siguientes características:

- 🔗 Endpoint `/pokemon/<id>` que devuelva un JSON estructurado con los datos del Pokémon.
- ✅ Manejo de errores (404).
- ✅ Implementación de caché.
- ✅ Frontend con búsqueda por nombre o ID.
- ✅ Tarjeta visual con los datos del Pokémon.
- ✅ Sección de evoluciones.
- ✅ Otros Pokémon recomendados.
- ✅ Responsive y funcional.
- ❌ Docker no utilizado (explicación más abajo).
- ✅ Video explicativo de construcción del backend desde cero.

# 🧭 Pokédex Interactiva con Next.js

 Este proyecto es una aplicación web desarrollada con **Next.js** y React que permite buscar Pokémon por nombre o número, ver sus detalles, visualizar sus evoluciones y explorar otros Pokémon mediante un carrusel dinámico.

---

## 🚀 Características

- 🔎 **Buscador interactivo**: Encuentra cualquier Pokémon por su nombre o número.
- 🧾 **Tarjeta de información**: Muestra los detalles del Pokémon seleccionado.
- 🔁 **Evoluciones**: Visualiza las evoluciones relacionadas del Pokémon actual.
- 🎠 **Carrusel de Pokémon**: Explora otros Pokémon aleatoriamente.
- 💥 **Diseño atractivo**: Estética inspirada en Pokémon, responsiva y con animaciones suaves.

---

## 🧱 Tecnologías utilizadas

- ⚛️ [React](https://reactjs.org/)
- 🌐 [Next.js](https://nextjs.org/)
- 🖼️ [Next/Image](https://nextjs.org/docs/api-reference/next/image)
- 🎨 CSS inline con estilo Pokémon
- 🌍 [PokéAPI](https://pokeapi.co/) – Fuente de datos oficial para Pokémon

---

## 📁 Estructura del proyecto

```
└── 📁app
    └── 📁components
        └── evoluciones.jsx
        └── Header.jsx
        └── Header.module.css
        └── pokemonCard.jsx
        └── PokemonCard.module.css
        └── PokemonCarousel.jsx
        └── PokemonCarousel.module.css
        └── PokemonPopup.jsx
        └── PokemonPopup.module.css
    └── 📁images
        └── a0f7db0406a7c9430c2082eecc5b1ca9.jpg
        └── Screenshot 2025-04-09 at 10.06.01 AM.png
    └── favicon.ico
    └── globals.css
    └── layout.tsx
    └── page.jsx
```
# 🎨 Pokédex con Estilo Visual Personalizado

 complementada con un diseño visual colorido, moderno y temático basado en Pokémon. ¡No solo ofrece funcionalidad, sino también estilo!

---

## ✨ Características del Diseño

🎨 **Colores temáticos**
- `--accent`: Rojo Pokémon para resaltar botones y bordes importantes.
- `--bg-main`: Blanco como fondo general para un diseño limpio.
- `--text-primary`: Marrón oscuro para excelente contraste y legibilidad.

🖼️ **Fondos personalizados**
- En pantallas grandes: fondo con arte de Pikachu en el lateral derecho.
- En móviles: cambia automáticamente a una imagen centrada con estilo más tecnológico/Pokémon.
- Difuminado con `backdrop-filter: blur(6px)` para efecto "glassmorphism".

📱 **Responsive Design**
- Comportamiento visual diferente para dispositivos menores a 700px.
- Uso de `media queries` para adaptar fondo y estructura.

💡 **Animaciones suaves**
- Transiciones al interactuar con inputs y botones.

---

## 🎯 Estilos CSS destacados

```css
:root {
  --bg-main: #ffffff;
  --bg-card: rgba(255, 255, 255, 0.643);
  --text-primary: #393000;
  --accent: #EE3030; 
  --blue-accent: #EE3030; 
  --border-color: rgb(255, 255, 255);
}

main {
  position: relative;
  padding: 2rem;
  min-height: 100vh;
  backdrop-filter: blur(6px);
}

main::before {
  content: "";
  background-image: url('https://i.pinimg.com/736x/2d/a3/e2/2da3e25b594272fadb7076899bcae1d6.jpg');
  background-size: 34%;
  background-repeat: no-repeat;
  background-position: right;
}


