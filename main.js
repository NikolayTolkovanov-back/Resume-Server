import express from 'express'
import mysql from "mysql";
import Config from "./src/Config.js";
import Controller from "./src/Controller.js"
import Service from "./src/Service.js"


const app = express()
app.use(express.json())

const config = new Config("./config.json");

const port = config.getParam("server.port");

const host = config.getParam("db.host");
const database = config.getParam("db.name");
const user = config.getParam("db.login");
const password = config.getParam("db.password");

const connection = mysql.createConnection({
  host,
  user,
  password,
  database
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

const service = new Service(connection)
const controller = new Controller(service)

app.listen(port, () => console.log(`Server listening on port ${port}, address: http://localhost:3000`))

app.get('/', (req, res) => {
  res.status(200).send("<p>Persistence yields results<p>")
})

app.post('/bids', (req, res) => controller.addBid(req, res))