const PDFdoc = require('pdfkit');
const fs = require('fs');
var db = require("../models");

module.exports = function (app) {

    app.get("/api/flashcards/deck/pdf/:id", (req, res) =>  {
 
        let doc = new PDFdoc;

        db.Flashcard.findAll({
            where: {deckId: req.params.id},
            include: [db.Deck]
        })
            .then((dbFlashcard) => {
                if (dbFlashcard.length > 0) {
                    doc.pipe(fs.createWriteStream(`./output.pdf`));
                    doc.fontSize(20)
                        .font("Courier-Bold")
                        .text(`${dbFlashcard[0].Deck.category}: ${dbFlashcard[0].Deck.deck_name}`, {align: "center"})
                        .moveDown(1.5)

                    dbFlashcard.forEach(card => {
                        doc.fontSize(14)
                            .text("Q: " + card.term)
                        doc.moveDown(.5);
                        doc.text("A: " + card.def, {indent: 45})
                        doc.moveDown(2);
                    })
                }
                res.json(dbFlashcard);
            }).then(() => doc.end());
    });

}

