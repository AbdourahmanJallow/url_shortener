require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDB = require('./config/connectDB');
const errorHandler = require('./middleware/error');
const app = express();

// Routes
const urls = require('./routes/urls');

connectDB();

const PORT = 9800 || process.env.PORT;

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', urls);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
