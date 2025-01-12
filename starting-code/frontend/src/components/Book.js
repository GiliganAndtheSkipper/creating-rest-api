import React, { useState } from "react";
import PropTypes from 'prop-types';
import { deleteBook, updateBook } from '../api/books';

// Material UI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const Book = ({ setBooks, bookId, bookTitle, bookStart, bookEnd }) => {
    const [updateNewBookTitle, setNewUpdateBookTitle] = useState(bookTitle);
    const [updateNewBookStart, setNewUpdateBookStart] = useState(bookStart);
    const [updateNewBookEnd, setNewUpdateBookEnd] = useState(bookEnd);

    // Delete a specific book
    const onDeleteBook = async (id) => {
        try {
            const responseStatus = await deleteBook(id);
            if (responseStatus !== 200) {
                alert("Deleting failed");
                return;
            }
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
        } catch (error) {
            console.error("Error deleting the book:", error);
        }
    };

    // Update a specific book
    const onUpdateBook = async (id, newTitle, newStart, newEnd) => {
        try {
            const responseStatus = await updateBook(id, newTitle, newStart, newEnd);
            if (responseStatus !== 200) {
                alert("Updating failed");
                return;
            }
            setBooks((prevBooks) => {
                const updatedBooks = [...prevBooks];
                const bookIndex = updatedBooks.findIndex(book => book.id === id);
                if (bookIndex !== -1) {
                    updatedBooks[bookIndex] = { id, title: newTitle, start: newStart, end: newEnd };
                }
                return updatedBooks;
            });
        } catch (error) {
            console.error("Error updating the book:", error);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onUpdateBook(bookId, updateNewBookTitle, updateNewBookStart, updateNewBookEnd);
            }}
        >
            <Stack key={bookId} spacing={2}>
                {/* Title Input */}
                <TextField
                    label="Title"
                    value={updateNewBookTitle}
                    variant="standard"
                    onChange={(e) => setNewUpdateBookTitle(e.target.value)}
                    required
                />

                {/* Date Pickers */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={updateNewBookStart ? new Date(updateNewBookStart) : null}
                        onChange={(newValue) => setNewUpdateBookStart(newValue?.toISOString())}
                        slotProps={{ textField: { variant: 'outlined' } }}
                    />
                    <DatePicker
                        label="End Date"
                        value={updateNewBookEnd ? new Date(updateNewBookEnd) : null}
                        onChange={(newValue) => setNewUpdateBookEnd(newValue?.toISOString())}
                        slotProps={{ textField: { variant: 'outlined' } }}
                    />
                </LocalizationProvider>

                {/* Action Buttons */}
                <Button type="submit" variant="contained" color="success">
                    Update Book
                </Button>
                <Button variant="contained" color="error" onClick={() => onDeleteBook(bookId)}>
                    Delete Book
                </Button>
            </Stack>
        </form>
    );
};

// ✅ Adding PropTypes for better error prevention
Book.propTypes = {
    setBooks: PropTypes.func.isRequired,
    bookId: PropTypes.number.isRequired,
    bookTitle: PropTypes.string.isRequired,
    bookStart: PropTypes.string.isRequired,
    bookEnd: PropTypes.string.isRequired
};

export default Book;
