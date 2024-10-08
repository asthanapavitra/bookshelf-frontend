import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import About from './About';
import axios from 'axios';
import AddNewBook from './AddNewBook';
import BookDetails from './BookDetails';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books with optional search and sort params
  const fetchBooks = async (search = '', sort = 'Title') => {
    try {
      const response = await axios.get('https://bookshelf-backend-phi.vercel.app/api/books', {
        params: { search, sort }
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Search handler
  const handleSearch = (searchTerm) => {
    fetchBooks(searchTerm);
  };

  // Sort handler
  const handleSort = (sortOption) => {
    fetchBooks('', sortOption);
  };

  const handleAddBook = async (newBook) => {
    try {
      const response = await axios.post('https://bookshelf-backend-phi.vercel.app/api/books', newBook);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home books={books} onSearch={handleSearch} onSort={handleSort} />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-book" element={<AddNewBook onAddBook={handleAddBook} />} />
        <Route path="/book/:id" element={<BookDetails books={books} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
