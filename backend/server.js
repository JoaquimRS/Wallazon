const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const logger = require('morgan')
require("dotenv").config()
const client = require('prom-client')
const app = express();

global.__basedir = __dirname;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterHomeEndpoint = new client.Counter({
  name: 'counterHomeEndpoint',
  help: 'The total number of processed requests'
});

app.use(logger(':method :url'));
app.use(express.urlencoded({ extended: true }));

const { db } = require('./config/')
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.use(cors({
  origin: '*',
}))

app.use('/api',require('./routes'))


mongoose.connect(db.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));


app.get("/", (req, res) => {
  counterHomeEndpoint.inc();
  res.json({ message: "Welcome to Wallazon app, made with Express - Mongo - Angular" });
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  client.register.metrics().then(data => res.send(data))
});

app.listen(port,hostname, () => { 
  console.log(`http://localhost:${port}`);
});
