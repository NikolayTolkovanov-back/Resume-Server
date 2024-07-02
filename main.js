import express from "express";
import mysql from "mysql2/promise";
import Config from "./src/Config.js";
import Controller from "./src/Controller.js";
import Service from "./src/Service.js";

async function startServer() {
  console.log("START SERVER");

  const app = express();
  app.use(express.json());

  const config = new Config("./config.json");

  const port = config.getParam("server.port");

  const host = config.getParam("db.host");
  const database = config.getParam("db.name");
  const user = config.getParam("db.login");
  const password = config.getParam("db.password");

  const connection = await mysql.createConnection({
    host,
    user,
    password,
    database,
  });

  connection.addListener('error', (err) => {
    throw new Error("error connecting: " + err);
  });

  const service = new Service(connection);
  const controller = new Controller(service);

  app.listen(port, () =>
    console.log(
      `Server listening on port ${port}, address: http://localhost:${port}`
    )
  );

  app.get("/", (req, res) => {
    res.status(200).send("<p>Persistence yields results<p>");
  });

  app.post("/bids", async (req, res) => {
    await controller.addBid(req, res)
  });
}

startServer();
