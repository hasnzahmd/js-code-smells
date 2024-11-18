const express = require('express');
const { detectCodeSmells } = require('../utils/main.js');

const router = express.Router();

router.post('/detect-code-smells', async (req, res) => {
    const { path } = req.body;
    if (!path) {
        return res.status(400).json({ error: 'Please enter a valid directory path.' });
    }
    try {
        const codeSmells = detectCodeSmells(path);
        res.status(200).json(codeSmells);
        console.log("Response sent");

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: `Error: ${error.message}` });
    }
});

module.exports = router;