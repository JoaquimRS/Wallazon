FROM node:19-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm install

FROM node:19-alpine as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 8080

CMD ["npm","start"]
