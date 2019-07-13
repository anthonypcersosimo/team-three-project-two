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

    Flashcard.associate = function(models) {

        Flashcard.belongsTo(models.Deck, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Flashcard;
};
