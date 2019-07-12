const express = require('express');
const router = express.Router();

const flashcard = require('../models/flashcard.js');

// // This is the default route that will confirm connection
router.get('/', (req, res) => res.status(200).json({ message: "connected!" }));

router.get('/api/flashcards', (req, res) => 
    flashcard.selectAll(data => res.json(data)));

module.exports = router;