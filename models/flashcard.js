const orm = require('../config/orm');

const flashcard = {
    selectAll: cb => {
        orm.selectAll('cards', res => {
            cb(res);
        });
    }
};

module.exports = flashcard;