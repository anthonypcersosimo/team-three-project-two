const connection = require("../config/connection.js");

const orm = {
    
    // Right now the orm just has a selectAll route to test out the folder structure and connections, and to make sure that the files are being required between each other properly.

    // Also we can ping the selectall route from a url to test it, whereas the post routes will need UI.
    
    selectAll: function (tableName, cb) {
        const queryString = " SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        })
    }
};

module.exports = orm;