const Book = require('./book.model');

// Retrieve all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a specific book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { title, author, description, publishedYear } = req.body;
  try {
    const book = await Book.create({ title, author, description, publishedYear });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, publishedYear } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, description, publishedYear },
      { new: true }
    );
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (book) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
