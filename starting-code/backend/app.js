const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Import the books router
const booksRouter = require('./routes/Books');

const app = express();
const PORT = process.env.PORT;

// ✅ CORS Configuration (Allows all origins, can be restricted further if needed)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// ✅ Middleware for Logging, JSON Parsing, and Form Parsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Main Route Setup
app.use('/books', booksRouter);

// ✅ 404 Error Handling for Undefined Routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ✅ Global Error Handling Middleware (Catches Internal Errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

// ✅ Start Server (Can be moved to `bin/www` if needed)
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;
