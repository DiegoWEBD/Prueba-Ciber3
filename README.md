# 📝 Aplicación de Notas - Prueba Ciber3

Una aplicación web moderna para gestionar notas personales con sistema de autenticación, construida con Next.js, TypeScript y Tailwind CSS.

## 🚀 Características

- **Sistema de Autenticación**: Login y registro de usuarios
- **Gestión de Notas**: Crear, editar, eliminar y visualizar notas
- **Interfaz Moderna**: Diseño responsive con Tailwind CSS
- **Componentes UI**: Utilizando Radix UI para accesibilidad
- **Persistencia de Datos**: Almacenamiento local con JSON
- **Docker**: Configuración para despliegue containerizado

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Tailwind CSS Animate
- **UI Components**: Radix UI, Lucide React
- **Forms**: React Hook Form, Zod validation
- **State Management**: React Hooks
- **Deployment**: Docker

## 📦 Instalación

### Prerrequisitos

- Node.js 20 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/DiegoWEBD/Prueba-Ciber3.git
   cd Prueba-Ciber3
   ```

2. **Instalar dependencias**
   ```bash
   npm install --force
   ```

3. **Compilar el proyecto**
   ```bash
   npm run build
   ```

4. **Ejecutar el proyecto**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🐳 Ejecutar con Docker

### Construir la imagen
```bash
docker build -t notas-app .
```

### Ejecutar el contenedor
```bash
docker run -p 3000:3000 notas-app
```

## 📁 Estructura del Proyecto

```
Prueba-Ciber3/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── auth/          # Endpoints de autenticación
│   │   └── notes/         # Endpoints de notas
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes UI reutilizables
│   ├── login-form.tsx    # Formulario de login
│   ├── notes-app.tsx     # Aplicación principal de notas
│   ├── note-card.tsx     # Tarjeta de nota individual
│   ├── create-note-dialog.tsx # Diálogo para crear notas
│   └── theme-provider.tsx # Proveedor de tema
├── data/                 # Datos JSON
│   ├── users.json        # Usuarios registrados
│   └── notes.json        # Notas almacenadas
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y configuraciones
├── public/               # Archivos estáticos
├── styles/               # Estilos adicionales
└── Dockerfile           # Configuración de Docker
```

## 🔐 Autenticación

La aplicación incluye un sistema de autenticación básico:

- **Login**: Autenticación con usuario y contraseña
- **Registro**: Creación de nuevas cuentas
- **Persistencia**: Sesión mantenida en localStorage

## 📝 Gestión de Notas

### Funcionalidades
- ✅ Crear nuevas notas
- ✅ Editar notas existentes
- ✅ Eliminar notas individuales
- ✅ Eliminar todas las notas

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run start    # Ejecutar en modo producción
npm run lint     # Ejecutar linter
```
