const routes = require('express').Router();
const path = require('path');

const tempData = {
    name: 'kyle',
    occupation: 'crushing Js'
  }

routes.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/index.html"));
    res.status(200).json({ message: "connected!" });
});

routes.get("/data", (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/index.html"));
    res.status(200).json(tempData);
});
module.exports = routes;