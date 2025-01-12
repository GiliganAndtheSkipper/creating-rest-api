import React, { useState, useEffect } from "react";
import CalendarComponent from './calendar';
import Book from './Book';
import { getBooks, addNewBook } from '../api/books';

// Material UI Components
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';

import '../App.css';

const BookSchedule = () => {
    // State to manage books and form inputs
    const [books, setBooks] = useState([]);
    const [newBookTitle, setNewBookTitle] = useState("");
    const [newBookStart, setNewBookStart] = useState(new Date().toISOString());
    const [newBookEnd, setNewBookEnd] = useState(new Date().toISOString());

    // Fetch books on component load
    useEffect(() => {
        async function fetchData() {
            try {
                const booksData = await getBooks();
                setBooks(booksData);
            } catch (error) {
                console.error("Error fetching books:", error);
                alert("Failed to fetch books.");
            }
        }
        fetchData();
    }, []);

    // Add a new book with validation
    const onAddNewBook = async () => {
        if (!newBookTitle.trim()) {
            alert("Book title cannot be empty!");
            return;
        }
        try {
            const newBook = await addNewBook(newBookTitle, newBookStart, newBookEnd);
            setBooks((prevBooks) => [...prevBooks, newBook]);
            setNewBookTitle('');
            setNewBookStart(new Date().toISOString());
            setNewBookEnd(new Date().toISOString());
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    // Map and display existing books
    const existingBooks = books.map((book) => (
        <Book
            key={book.id}
            bookId={book.id}
            bookTitle={book.title}
            bookStart={book.start}
            bookEnd={book.end}
            setBooks={setBooks}
        />
    ));

    return (
        <div>
            <CalendarComponent events={books} />
            <h3>Add a New Book to Read!</h3>
            <div className="add-new">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onAddNewBook();
                }}>
                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Add Book Title"
                            variant="standard"
                            value={newBookTitle}
                            onChange={(e) => setNewBookTitle(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={newBookStart ? new Date(newBookStart) : null}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setNewBookStart(newValue.toISOString());
                                    }
                                }}
                                slotProps={{ textField: { variant: 'outlined' } }}
                            />
                            <DatePicker
                                label="End Date"
                                value={newBookEnd ? new Date(newBookEnd) : null}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setNewBookEnd(newValue.toISOString());
                                    }
                                }}
                                slotProps={{ textField: { variant: 'outlined' } }}
                            />
                        </LocalizationProvider>
                        <Button variant="contained" type="submit">Add Book</Button>
                    </Stack>
                </form>
            </div>
            <div className="existing-books">
                <h3>Existing Book Schedules</h3>
                <List>{existingBooks}</List>
            </div>
        </div>
    );
};

export default BookSchedule;
