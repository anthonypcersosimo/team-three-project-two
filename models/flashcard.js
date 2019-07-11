var Sequelize = require("sequelize");

var sequelize = require("../config/connection");

var Flashcard = sequelize.define("flashcard", {
  
    // table schema goes here, columns follow the format below
  
    //title: Sequelize.STRING
});

Flashcard.sync();

module.exports = Flashcard;