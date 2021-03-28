FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json ./

RUN npm install
COPY . ./

EXPOSE 8080
CMD ["npm", "run-script", "docker-start"]