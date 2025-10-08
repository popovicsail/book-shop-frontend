import React from "react";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import HomePage from './pages/HomePage/Homepage';
import BooksPage from './pages/Books/BooksPage'
import PublishersPage from "./pages/Publishers/PublishersPage"; 
import BookFormContainer from "./containers/BookFormContainer";
import AuthorsPage from "./pages/Authors/AuthorsPage";

const App = () => {
  return (
    <section className="main-container">
      <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/publishers" element={<PublishersPage />}></Route>
            <Route path="/books" element={<BooksPage />}></Route>
            <Route path="/books/add" element={<BookFormContainer />}></Route>
            <Route path="/books/edit/:bookId" element={<BookFormContainer />}></Route>
            <Route path="/authors" element={<AuthorsPage />}></Route>
          </Routes>
        </main>
      <Footer />
    </section >
  )
}

export default App