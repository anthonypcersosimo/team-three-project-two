// const orm = require('../config/orm');

// const flashcard = {
//     selectAll: cb => {
//         orm.selectAll('cards', res => cb(res));
//     },

//     addCard: (cols, vals, cb) => {
//         console.log(cols, vals)
//         orm.create('cards', cols, vals, (res) => cb(res))
//     }

// };

// module.exports = flashcard;

module.exports = function (sequelize, DataTypes) {
    var Flashcard = sequelize.define("Flashcard", {
        deck_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        term: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        def: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        }
    });
    return Flashcard;
};
