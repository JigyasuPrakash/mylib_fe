import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Layout/Home/Home';
import Navbar from './components/Header/Navbar';
import Authors from './components/Layout/Authors/Authors';
import Author from './components/Layout/Authors/Author';
import Books from './components/Layout/Books/Books';
import Book from './components/Layout/Books/Book';
import NoPage from './components/Layout/NoPage/NoPage';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Navbar /><br />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route exact path="book" element={<Books />} />
            <Route exact path="author" element={<Authors />} />
            <Route path="book/:id" element={<Book />} />
            <Route path="author/:id" element={<Author />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
