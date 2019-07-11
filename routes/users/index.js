const users = require('express').Router();

const all = require('./all');
users.get('/', all);

const add = require('./add');
users.post('/', add);

// more routes go here, this is just a sketch so far

module.exports = users;