require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDB = require('./config/connectDB');
const errorHandler = require('./middleware/error');
const app = express();

connectDB();

const PORT = 9800 || process.env.PORT;

app.post('/', (req, res) => {
    console.log(`${req.protocol} ${req.method} ${req.url}`);

    res.json({ success: true });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
