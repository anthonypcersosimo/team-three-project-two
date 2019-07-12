const orm = require('../config/orm');

const flashcard = {
    selectAll: cb => {
        orm.selectAll('cards', res => cb(res));
    },

    addCard: (cols, vals, cb) => {
        console.log(cols, vals)
        orm.create('cards', cols, vals, (res) => cb(res))
    }

};

module.exports = flashcard;