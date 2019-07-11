var Sequelize = require("sequelize");

var sequelize = require("../config/connection");

var User = sequelize.define("user", {
  
    // table schema goes here, columns follow the format below
  
    //title: Sequelize.STRING
});

User.sync();

module.exports = User;