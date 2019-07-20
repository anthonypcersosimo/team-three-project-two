const PDFdoc = require('pdfkit');
const fs = require('fs');
var db = require("../models");

// const doc = new PDFdoc;

// doc.pipe(fs.createWriteStream('./output.pdf'));

module.exports = function (app) {

    const doc = new PDFdoc;

    doc.pipe(fs.createWriteStream('./output.pdf'));

    // doc.text('foo bar!', 100, 100)
    // doc.end();


    app.get("/api/flashcards/pdf", function (req, res) {
        db.Flashcard.findAll({
            where: {},
            include: [db.Deck]
        })
            .then(function (dbFlashcard) {
                
                dbFlashcard.forEach(card => {
                    doc.text(card.term, {
                        // lineBreak: false
                    })
                    doc.moveDown(2);
                    doc.text(card.def,{
                        // lineBreak: false
                    })
                    doc.moveDown(2);
                })
                
                res.json(dbFlashcard);
            }).then(function() {

                doc.end();
            });
    });

}

