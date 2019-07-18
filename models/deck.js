module.exports = function (sequelize, DataTypes) {
  var Deck = sequelize.define("Deck", {
    deck_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Deck.associate = function (models) {

    Deck.hasMany(models.Flashcard, {
      onDelete: "cascade"
    });
  };

  return Deck;
};