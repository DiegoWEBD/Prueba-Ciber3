# Usa una imagen base oficial de Node
FROM node:alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala dependencias (sin conflictos)
RUN npm install --legacy-peer-deps

# 🔧 Compila la app en modo producción
RUN npm run build

# Expón el puerto (ajústalo si usas otro)
EXPOSE 3000

# Inicia la app en modo producción
CMD ["npm", "start"]
