FROM node:14-alpine
WORKDIR /usr/src/ping_client
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm i -g serve
RUN npm i
RUN npm run build
CMD [ "serve", "-s", "build" ]