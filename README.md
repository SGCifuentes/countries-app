
# 🌍 Where in the World?  

**Una aplicación frontend en Next.js que te permite explorar países de todo el mundo, buscar por nombre, filtrar por región y ver detalles ampliados de cada uno.**

---

## 🖼️ Demo / Capturas de Pantalla
> **Demo**
> [Where in the World?](https://interview-where-in-the-world.netlify.app/)

> **Listado de países (modo oscuro)**  
> ![Listado de países](https://i.ibb.co/SbRqnyx/image.png)

> **Detalle de un país**  
> ![Detalle de país](https://i.ibb.co/V0KJpxd7/image.png)

---

## 🛠️ Tecnologías

- **Framework**: Next.js  
- **Librerías**: React, Tailwind CSS, Heroicons  
- **Testing**: Vitest + React Testing Library  
- **Fetch / SSR**: Datos cargados con SSR desde [restcountries.com](https://restcountries.com)  
- **Hosting**: Netlify 

---

## ⚙️ Instalación y Puesta en Marcha
- Clona el repositorio  
```bash
git clone https://github.com/SGCifuentes/countries-app.git
cd countries-app
```  
- Instala dependencias
```bash
npm install
```
- Levantar proyecto
```bash
npm run dev
# or
yarn dev
```
- Correr tests
```bash
npm run test
# or
yarn test
```
- Ver coverage
```bash
npm run coverage
# or
yarn coverage
```
---

## 📁 Estructura del Proyecto
    src/
    ├── app/                # Páginas y layouts de Next.js
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/         # Componentes reutilizables
    │   ├── CountryCard.tsx
    │   └── FilterSelect.tsx
    ├── hooks/              # Custom hooks (p. ej. useFetchCountries)
    ├── mocks/              # Datos de ejemplo para tests
    ├── styles/             # Clases globales y config de Tailwind
    ├── types/              # Tipos TypeScript
    ├── utils/              # Funciones auxiliares
    └── __tests__/          # Tests de Vitest + RTL

---
