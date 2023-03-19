const express = require('express')
const http = require('http')
const path = require('path')
const Dalai = require("../../index")
const app = express()
const httpServer = http.Server(app);
const start = (port, home) => {
  const dalai = new Dalai(home)
  dalai.http(httpServer)
  app.use(express.static(path.resolve(__dirname, 'public')))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'views')));
  app.use("/public", express.static(path.join(__dirname, 'public')));
  httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
  })
}
module.exports = start
