const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const logger = require('morgan')
require("dotenv").config()
const app = express();

global.__basedir = __dirname;

app.use(logger(':method :url'));
app.use(express.urlencoded({ extended: true }));

const { db } = require('./config/')
const hostname = process.env.HOSTNAME;
const port = process.env.PORT

app.use(cors())
app.use(require("./routes"))


mongoose.connect(db.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wallazon app, made with Express - Mongo - Angular" });
});

app.listen(port,hostname, () => { 
  console.log(`http://ximo.com:${port}`);
});
