require('dotenv').config();
const express = require("express");
const routes = require("./routes");

const app = express();

const port = process.env.PORT;

routes(app);

app.listen(port, process.env.APP_HOST, () =>
  console.log(`servidor rodando em http://${process.env.APP_HOST}:` + port)
);

module.exports = app;
