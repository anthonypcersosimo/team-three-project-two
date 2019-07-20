var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/pdf", function (req, res) {
    res.sendFile(path.join(__dirname, "../output.pdf"))
  });

  app.get("/display", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/displayDecksTable.html"));
  });
  
  app.get("/card", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/card.html"));
  });
  
  app.get("/form", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addForm.html"));
  });
};
