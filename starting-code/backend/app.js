const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Import the books router
const booksRouter = require('./routes/Books');

const app = express();

// Use dynamic PORT assignment for Render deployment
const PORT = process.env.PORT || 3001;

// CORS Configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Middleware for logging, parsing JSON and forms
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Default Route for Testing
app.get('/', (req, res) => {
    res.send('Welcome to the Book Club API! Try /books to get started.');
});

// Main Route Setup
app.use('/books', booksRouter);

// Error Handling
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Something went wrong on the server' });
});

// Bind the server to the dynamic port
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
