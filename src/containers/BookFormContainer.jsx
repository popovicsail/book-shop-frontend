import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../pages/BookForm/BookForm'
import { getBookById, updateBook, createBook } from '../services/BookServices/BookServices';

const BookFormContainer = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [bookToEdit, setBookToEdit] = useState(null)
  const [error, setError] = useState('');

  const isEditing = Boolean(bookId)

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const data = await getBookById(bookId);
        setBookToEdit(data);
      } catch (err) {
        setError('ERROR: getBookById');
      }
    };

    if (isEditing) {
      fetchBookData();
    } else {
      setBookToEdit(null);
    }
  }, [bookId, isEditing]);



  const handleBookSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateBook(bookId, data);
      } else {
        await createBook(data);
      }
      navigate('/books');
    } catch (err) {
      setError('ERROR: handleBookSubmit');
    }
  };

  return (
    <>
      <BookForm
        onBookSubmit={handleBookSubmit}
        bookToEdit={bookToEdit}
      />
    </>
  )
}

export default BookFormContainer