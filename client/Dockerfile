# Usa un'immagine Node.js come base
FROM node:20 AS builder

# Imposta la directory di lavoro nell'app
WORKDIR /app

# Copia il file package.json e package-lock.json per installare le dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install --ignore-scripts

# Copia il resto dell'app
COPY .. .

# Compila l'app Angular
RUN npm run build --prod

# Usa un'immagine Nginx come immagine finale
FROM nginx:alpine

# Copia i file compilati dall'immagine del builder
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Esponi la porta 80
EXPOSE 80

# Comando di avvio per Nginx
CMD ["nginx", "-g", "daemon off;"]
