// Import the API endpoint for connecting with the backend server
import { API_ENDPOINT } from "./index.js";

// Create a function to add a new book (POST request)
export const addNewBook = async (newTitle, newStart, newEnd) => {
    const response = await fetch(`${API_ENDPOINT}/books`, {
        method: "POST",
        body: JSON.stringify({
            title: newTitle,
            start: newStart,
            end: newEnd
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const newBook = await response.json();
    return newBook;
};

// Create a function to retrieve all books (GET request)
export const getBooks = async () => {
    const response = await fetch(`${API_ENDPOINT}/books`);
    const books = await response.json();
    return books;
};

// Create a function to update a book's information (PUT request)
export const updateBook = async (id, newTitle, newStart, newEnd) => {
    const response = await fetch(`${API_ENDPOINT}/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: newTitle,
            start: newStart,
            end: newEnd
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.status; // Returns the status code
};

// Create a function to delete a book (DELETE request)
export const deleteBook = async (id) => {
    const response = await fetch(`${API_ENDPOINT}/books/${id}`, {
        method: "DELETE"
    });
    return response.status; // Returns the status code
};
