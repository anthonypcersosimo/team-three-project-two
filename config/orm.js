const connection = require("../config/connection.js");

const printQuestionMarks = num => {
    let arr = [];
    for (i = 0; i < num; i++) {
        arr.push('?');
    };
    return arr.toString();
};

const orm = {

    // Right now the orm just has a selectAll route to test out the folder structure and connections, and to make sure that the files are being required between each other properly.

    // Also we can ping the selectall route from a url to test it, whereas the post routes will need UI.

    selectAll: function (tableName, cb) {
        const queryString = " SELECT * FROM " + tableName + ";";
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        })
    },

    create: (table, cols, vals, cb) => {
        let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)}) `
        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }

};

module.exports = orm;