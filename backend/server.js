const express = require('express');
const cors = require('cors');
const router = require('./routes/detect_code_smells.js');

const app = express();
const port = 5050;

app.use(cors());

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;