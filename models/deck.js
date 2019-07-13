module.exports = function(sequelize, DataTypes) {
    var Deck = sequelize.define("Deck", {
      // Giving the Author model a name of type STRING
      deck_name: DataTypes.STRING
    });
  
    Deck.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Deck.hasMany(models.Flashcard, {
        onDelete: "cascade"
      });
    };
  
    return Deck;
  };