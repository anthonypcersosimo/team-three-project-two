const PDFdoc = require('pdfkit');
const fs = require('fs');
var db = require("../models");

module.exports = function (app) {

    // const doc = new PDFdoc;

    // doc.pipe(fs.createWriteStream('./output.pdf'));

    app.get("/api/flashcards/deck/pdf/:id", function (req, res) {

        let doc = new PDFdoc;

        db.Flashcard.findAll({
            where: {
                deckId: req.params.id
            },
            include: [db.Deck]
        })
            .then(function (dbFlashcard) {
                // const doc = new PDFdoc;
                
                // doc.pipe(fs.createWriteStream(`./${dbFlashcard[0].deck.deck_name}.pdf`));
                doc.pipe(fs.createWriteStream(`./output.pdf`));

                dbFlashcard.forEach(card => {
                    doc.text(card.term, {
                        // lineBreak: false
                    })
                    doc.moveDown(2);
                    doc.text(card.def, {
                        // lineBreak: false
                    })
                    doc.moveDown(2);
                })

                res.json(dbFlashcard);

            }).then(function () {

                doc.end();
            });
    });

}

