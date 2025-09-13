import React from 'react';
import {Link} from 'react-router-dom'
import './Header.scss'

const Header = () => {
  return (
    <header>
      <Link to="/">Home Page</Link>    
      <Link to="/publishers">Publishers</Link>
      <Link to="/books">Books</Link>
      <Link to="/books/add">Create New Book</Link>
    </header>
  );
}

export default Header;