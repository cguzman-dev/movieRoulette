# 🎬 Movie Roulette

¡Descubre películas al azar con filtros personalizados y guarda tus favoritos! Una app interactiva construida con React, TypeScript y la API de TMDB.

*(Ejemplo: Interfaz con filtros y película aleatoria)*

## 🚀 Características

- **Ruleta interactiva**: Animación realista al buscar películas.
- **Filtros inteligentes**: Por género, año y rating.
- **Trailers integrados**: Reproduce tráilers de YouTube.
- **Favoritos**: Guarda películas en localStorage.
- **Modo oscuro/claro**: Diseño adaptable a preferencias.
- **Responsive**: Funciona en móvil y desktop.

## 🔧 Tecnologías

- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
- ![TMDB API](https://img.shields.io/badge/-TMDB_API-01D277?logo=themoviedatabase&logoColor=white)

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/movie-roulette.git
Instala dependencias:

bash
npm install
Configura tu API key de TMDB:

Crea un archivo .env en la raíz:

env
VITE_TMDB_KEY=tu_api_key
Inicia la app:

bash
npm run dev
🌍 Demo en vivo
¡Prueba la app directamente!
🔗 https://cguzman-dev.github.io/movie-roulette/

🎨 Estructura del proyecto
text
movie-roulette/
├── src/
│   ├── api/           # Lógica de conexión a TMDB
│   ├── components/    # Componentes reutilizables
│   ├── context/       # Theme context
│   ├── hooks/         # Custom hooks (useFavorites)
│   ├── types/         # Interfaces TypeScript
│   └── App.tsx        # Componente principal
├── index.html
├── vite.config.ts     # Configuración de Vite
└── package.json


## 📄 Licencia
[![CC BY-NC-ND 4.0](https://licensebuttons.net/l/by-nc-nd/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)  
Este trabajo está bajo una licencia [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0/).

Hecho con ❤️ y Vite