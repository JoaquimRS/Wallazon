# Wallazon
<!-- ## INDEX
* Introduction
* Building
* Usage
* Documentation
-->
## Intruduction
Practica - Docker-compose - 2 DAW

| Servicio | URL | PORT |
|-----------|----------|-----------|
| Backend | http://localhost:8080 | 8080 |
| Frontend | http://localhost:4200 | 4200 |
| MongoExpress | http://localhost:8081 | 8081 |
| LoadBalancer | http://localhost | 80 |
| Prometheus | http://localhost:9090 | 9090 |
| Grafana | http://localhost:3500 | 3500 |
         
## Building
Para descargarse el codigo, utilizar estos comandos:
```bash
git clone https://github.com/JoaquimRS/Wallazon.git
cd Wallazon
git checkout main_docker_compose
```

## Usage
Para lanzar nuestra aplicación y poder utilizarla, ejecutar el siguente comando:
```
docker-compose up
```
O también:
```
sudo docker-compose up
```

Para el correcto funcionamiento de la aplicación se recomienda borrar los contenedores y imagenes que tengan alguna relación

Borrar todas las imagenes:
```bash
docker rmi -f $(docker images -a -q)
```

Borrar todos los contenedores:
```bash
docker rm -f $(docker ps -a -q)
```

## Documentation
* Servicio de **mongodb**:

   Para hacer una copia de la base de datos:
   ```bash
   mongodump --db wallazon ./db_dump
   ```
   Creamos script que se encargue de hacer el restore en el contenedor que lo llamaremos ***mongodump.sh***
   ```bash
   #!/bin/bash
   for f in /db_dump/categories.bson /db_dump/comments.bson /db_dump/products.bson /db_dump/users.bson
   do
         mongorestore --db wallazon $f
   done
   ```
   En el docker-compose añadiremos lo siguiente:
   ```
   mongodb:
      image: mongo:latest
      container_name: mongo_container
      ports:
       - "27018:27017"
      networks:
       - practica-net
      volumes:
       - ./mongodump.sh:/docker-entrypoint-initdb.d/mongorestore.sh
       - ./db_dump:/db_dump
      restart: always
   ```
   
* Servicio de **backend**:

   Vamos a crear un Dockerfile en la carpeta ***backend*** de la aplicación con dos stages:
   ```
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
   ```
   En el docker-compose añadiremos lo siguiente:
   ```
   backend:
      build: ./backend
      container_name: backend_container
      ports:
       - "8080:8080"
      networks:
       - practica-net
      depends_on:
       - mongodb
      restart: always
   ```
   Para poder hacer la conexión de nuestro backend con la base de datos de mongo tendremos que modificar el fichero ***backend/config/db.config.js***
   ```
   url: "mongodb://mongodb:27017/wallazon"
   ```
   
* Servicio de **frontend**
   
   Vamos a crear un Dockerfile en la carpeta ***frontend*** de la aplicación con dos stages:
   ```
   FROM node:19-alpine as dependencies
   WORKDIR /app
   COPY package.json .
   RUN npm install
   
   FROM node:19-alpine as builder
   WORKDIR /app
   COPY --from=dependencies /app/node_modules ./node_modules
   COPY . .
   EXPOSE 4200
   
   CMD ["npm","start"]
   ```
   En el docker-compose añadiremos lo siguiente:
   ```
   frontend:
      build: ./frontend
      container_name: frontend_container
      ports:
       - "4200:4200"
      networks:
       - practica-net
      depends_on:
       - backend
      restart: always
   ```
   Para poder acceder a nuestra aplicación tendremos que modificar el fichero ***frontend/package.json***
   ```
   "start": "ng serve --host 0.0.0.0",
   ```
   
* Servicio **mongo-express**
   En el docker-compose añadiremos lo siguiente:
   ```
   mongo-express:
      image: mongo-express:latest
      container_name: adminMongo_container
      ports:
       - "8081:8081"
      networks:
       - practica-net
      environment:
       ME_CONFIG_MONGODB_SERVER: mongodb
      depends_on:
       - mongodb
      restart: always
   ```

* Servicio de **loadbalancer**

   Crearemos una carpeta llamada ***loadbalancer*** con el archivo ***nginx.conf*** con la siguiente configuración:
   ```
   events {
      worker_connections 1024;
   }
   http {
      upstream frontend {
         # These are references to our backend containers, facilitated by
         # Compose, as defined in docker-compose.yml
         server frontend:4200;
      }
      upstream backend {
         # These are references to our backend containers, facilitated by
         # Compose, as defined in docker-compose.yml
         server backend:8080;
      }
   server {
      listen 80;
      server_name frontend;
      server_name backend;
      location / {
         resolver 127.0.0.1 valid=30s;
         proxy_pass http://frontend;
         proxy_set_header Host $host;
      }
      location /api {
         resolver 127.0.0.1 valid=30s;
         proxy_pass http://backend;
         proxy_set_header Host $host;
      }
   }
   }
   
   ```
   En el docker-compose añadiremos lo siguiente:
   ```
   loadbalancer:
      image: nginx:latest
      volumes:
       - ./loadbalancer:/etc/nginx/
      command: ["nginx", "-g", "daemon off;"]
      ports:
       - "80:80"
      networks:
       - practica-net
      depends_on:
       - frontend
      restart: always
   ```
   El servicio de loadbalancer lo que nos permite es poder acceder fácilmente a nuestra aplicación y nuestra api con las rutas / y /api
   
   Para ello necesitaremos modificar tanto frontend como backend:
   * frontend
      ***frontend/src/environments/environment.ts***
      ```
      api_url: 'http://localhost/api',
      ```
      Y remplazar todas las referencias a http://localhost:8080 por http://localhost/api
   * backend
      ***backend/server.js***
      ```
      app.use(cors({
         origin: '*',
      }))
      app.use('/api',require('./routes'))
      ```
      
* Servicio **Prometheus**
   
   Creamos una carpeta llamada ***prometheus*** con el fichero ***prometheus.yml*** con la siguiente configuración:
   ```
   global:
      scrape_interval: 5s
      evaluation_interval: 30s
   scrape_configs:
    - job_name: "example-nodejs-app"
       honor_labels: true
       static_configs:
          - targets: ["backend:8080"]
   ```
   En el docker-compose añadiremos lo siguiente:
   ```
   prometheus:
      image: prom/prometheus:v2.20.1
      container_name: prometheus_practica
      ports:
       - "9090:9090"
      networks:
       - practica-net
      volumes:
       - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      command: "--config.file=/etc/prometheus/prometheus.yml"
      depends_on:
       - backend
      restart: always
   ```
   En la carpeta ***backend*** ejecutaremos el siguiente comando:
   ```bash
   npm install prom-client
   ```
   Tambien tendremos que modificar el ficher ***/backend/server.js*** para que cada vez que hagamos una consulta a http://localhost:8080/ se registre
   ```
   const client = require('prom-client')
   const collectDefaultMetrics = client.collectDefaultMetrics;
   collectDefaultMetrics({ timeout: 5000 });
   const counterHomeEndpoint = new client.Counter({
      name: 'counterHomeEndpoint',
      help: 'The total number of processed requests'
   });
   app.get("/", (req, res) => {
      counterHomeEndpoint.inc();
      res.json({ message: "Welcome to Wallazon app, made with Express - Mongo - Angular" });
   });
   app.get('/metrics', (req, res) => {
      res.set('Content-Type', client.register.contentType);
      client.register.metrics().then(data => res.send(data))
   });
   ```
* Servicio **Grafana**

   Creamos una carpeta llamada ***grafana*** con el fichero ***datasources.yml*** con la siguiente configuración:
   ```
   apiVersion: 1
   datasources:
   - name: Prometheus
      type: prometheus
      access: proxy
      orgId: 1
      url: prometheus_practica:9090
      basicAuth: false
      isDefault: true
      editable: true
   ```
   En el docker-compose añadiremos lo siguiente:
   ```
   grafana:
      image: grafana/grafana:7.1.5
      container_name: grafana_practica
      ports:
       - "3500:3000"
      networks:
       - practica-net
      volumes:
       - ./grafana/datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml
       - myGrafanaVol:/var/lib/grafana
      environment:
        GF_AUTH_DISABLE_LOGIN_FORM: "true"
        GF_AUTH_ANONYMOUS_ENABLED: "true"
        GF_AUTH_ANONYMOUS_ORG_ROLE: Admin
        GF_INSTALL_PLUGINS: grafana-clock-panel 1.0.1
      depends_on:
       - prometheus
      restart: always
   volumes:
      myGrafanaVol:
   ```
   Y finalmente añadiremos al docker-compose la network en la que todos van a estar conectados:
   ```
   networks:
      practica-net:
   ```
  
