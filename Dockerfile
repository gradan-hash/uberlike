FROM node:16
WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "index.js" ]git 