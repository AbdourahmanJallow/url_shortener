require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDB = require('./config/connectDB');
const errorHandler = require('./middleware/error');
const app = express();

// Routes
const urls = require('./routes/urls');
const { tinyUrl } = require('./controllers/urls');

connectDB();

const PORT = 8080 || process.env.PORT;

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom URL shortener
app.use('/api/v1', urls);

// Using Tinyurl API
app.post('/tinyurl', tinyUrl);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
