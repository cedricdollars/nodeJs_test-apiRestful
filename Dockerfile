FROM node:10.22.1-alpine 
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
CMD node index.js
