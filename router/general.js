const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    return res.status(200).json({ message: "Registration endpoint ready" });
});

// Get all books
public_users.get('/books', (req, res) => {
    return res.status(200).json(books);
});

// Get book details by ISBN
public_users.get('/books/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Get books by author
public_users.get('/books/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();
    const result = Object.values(books).filter(book => book.author.toLowerCase() === author);
    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "No books found by this author" });
    }
});

// Get books by title
public_users.get('/books/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();
    const result = Object.values(books).filter(book => book.title.toLowerCase() === title);
    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "No books found with this title" });
    }
});

// Get book review by ISBN
public_users.get('/books/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn] && books[isbn].reviews) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "No reviews found" });
    }
});

module.exports.general = public_users;
