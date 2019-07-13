module.exports = function(sequelize, DataTypes) {
    var Deck = sequelize.define("Deck", {

      deck_name: DataTypes.STRING
    });
  
    Deck.associate = function(models) {

      Deck.hasMany(models.Flashcard, {
        onDelete: "cascade"
      });
    };
  
    return Deck;
  };