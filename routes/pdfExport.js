const PDFdoc = require('pdfkit');
const fs = require('fs');
var db = require("../models");

// const doc = new PDFdoc;

// doc.pipe(fs.createWriteStream('./output.pdf'));

module.exports = function (app) {

    // const doc = new PDFdoc;

    // doc.pipe(fs.createWriteStream('./output.pdf'));

    // doc.text('Hello world!', 100, 100)
    // doc.end();


    app.get("/api/flashcards/pdf", function (req, res) {
        db.Flashcard.findAll({
            where: {},
            include: [db.Deck]
        })
            .then(function (dbFlashcard) {
                
                dbFlashcard.forEach(card => {
                    doc.text(card.term, 100, 100)
                    doc.text(card.def, 100, 100)
                })
                
                doc.end();
                res.json(dbFlashcard);
            });
    });

}

