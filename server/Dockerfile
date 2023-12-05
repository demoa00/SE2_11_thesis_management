# Usa un'immagine Node.js come base
FROM node:18

# Imposta la directory di lavoro nel server
WORKDIR /usr/src/server

# Copia i file necessari per l'installazione delle dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY . .

ENV DOCKER_CONFIG 'DOCKER'

# Esponi la porta su cui il server Express ascolterà le richieste
EXPOSE 3000

# Comando di avvio per il server Express
CMD ["node", "index.js"]