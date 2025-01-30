FROM node:latest

WORKDIR /app

EXPOSE 3000

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

# copiem de la carpeta actual al workdir dir
COPY . ./

CMD [ "npm", "start" ]