FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias (incluyendo devDependencies para compilar)
RUN npm ci

# Copiar código fuente
COPY tsconfig.json ./
COPY src ./src

# Compilar TypeScript
RUN npm run build

# --- Stage de producción ---
FROM node:20-alpine

WORKDIR /app

# Copiar solo dependencias de producción
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copiar código compilado desde el builder
COPY --from=builder /app/dist ./dist

# Usuario no-root para seguridad
USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]
