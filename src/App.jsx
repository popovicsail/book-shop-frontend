import React from "react";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import HomePage from './pages/HomePage/Homepage';
import Books from './pages/Books/Books'
import PublishersPage from "./pages/Publishers/PublishersPage"; 
import BookFormContainer from "./containers/BookFormContainer";

const App = () => {
  return (
    <section className="main-container">
      <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/publishers" element={<PublishersPage />}></Route>
            <Route path="/books" element={<Books />}></Route>
            <Route path="/books/add" element={<BookFormContainer />}></Route>
          </Routes>
        </main>
      <Footer />
    </section >
  )
}

export default App
