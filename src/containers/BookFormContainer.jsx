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
    if (isEditing) {
      getBookById(bookId)
        .then(data => {
          const formattedData = {
            ...data,
            publishedDate: data.publishedDate ? data.publishedDate.split('T')[0] : ''
          };
          setBookToEdit(formattedData);
        })
        .catch(() => {
          setError('ERROR: getBookById');
        });
    } else {
      setBookToEdit(null);
    }
  }, [bookId, isEditing]);



  const handleBookSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        publishedDate: new Date(data.publishedDate).toISOString()
      };

      if (isEditing) {
        await updateBook(bookId, payload);
      } else {
        await createBook(payload);
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