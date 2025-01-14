const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Import the books router
const booksRouter = require('./routes/Books');

const app = express();

// Set the PORT dynamically for compatibility with Render
const PORT = process.env.PORT || 3001;

// CORS Configuration (Allows all origins, can be restricted further if needed)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Middleware for Logging, JSON Parsing, and Form Parsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Default Route for Root Path
app.get('/', (req, res) => {
    res.send('Welcome to the Book Club API! Try /books to get started.');
});

// Main Route Setup
app.use('/books', booksRouter);

// 404 Error Handling for Undefined Routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start Server on the defined PORT
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
