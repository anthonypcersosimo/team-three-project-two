const express = require('express');
const router = express.Router();

const flashcard = require('../models/flashcard.js');

// // This is the default route that will confirm connection
router.get('/', (req, res) => {
    res.status(200).json({ message: "connected!" })
});

router.get('/api/flashcards', (req, res) => 
    flashcard.selectAll(data => res.json(data)));

router.post('/api/flashcards', (req, res) => 
    flashcard.addCard(['term', 'def'], [req.body.term, req.body.def], result => {
        res.json({ id: result.insertId });
        console.log("yay!")
    }))

module.exports = router;