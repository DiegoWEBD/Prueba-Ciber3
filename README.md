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
   git clone <url-del-repositorio>
   cd Prueba-Ciber3
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
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

### Usuario por defecto
- **Username**: `admin`
- **Password**: `123`

## 📝 Gestión de Notas

### Funcionalidades
- ✅ Crear nuevas notas
- ✅ Editar notas existentes
- ✅ Eliminar notas individuales
- ✅ Eliminar todas las notas
- ✅ Visualización en tiempo real
- ✅ Filtrado por usuario

### Estructura de una Nota
```json
{
  "id": "timestamp",
  "title": "Título de la nota",
  "content": "Contenido de la nota",
  "createdAt": "2025-06-18T20:20:29.279Z",
  "userId": "id-del-usuario"
}
```

## 🚨 Consideraciones de Seguridad

⚠️ **Importante**: Esta aplicación contiene vulnerabilidades de seguridad intencionales para propósitos educativos:

- Uso de `eval()` en el código (línea 25 de `app/page.tsx`)
- Almacenamiento de contraseñas en texto plano
- Autenticación basada en localStorage
- Validación de entrada insuficiente

**No usar en producción sin implementar medidas de seguridad adecuadas.**

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run start    # Ejecutar en modo producción
npm run lint     # Ejecutar linter
```

## 🔧 Configuración

### Variables de Entorno
Crear un archivo `.env.local` en la raíz del proyecto:

```env
# Configuraciones de la aplicación
NEXT_PUBLIC_APP_NAME=Notas App
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Tailwind CSS
La aplicación utiliza Tailwind CSS con configuración personalizada en `tailwind.config.ts`.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Dispositivos móviles
- 💻 Tablets
- 🖥️ Escritorio

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Discorg RPG** - [GitHub](https://github.com/discorg-rpg)

---

⭐ Si este proyecto te ha sido útil, ¡dale una estrella! 
