import React, { useState, useEffect } from 'react'
import Book from '../../components/Book/Book';
import { getAllBooks, deleteBook, updateBook } from '../../services/BookServices/BookServices';
import { useNavigate } from 'react-router-dom';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooks();
                setBooks(data);
            } catch (err) {
                setError('ERROR: fetchBooks.');
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        try {
            await deleteBook(bookId);
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (err) {
            setError('ERROR: deleteBook.');
        }
    };

    const handleEdit = (bookId) => {
        navigate(`/books/edit/${bookId}`)
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>PageCount</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <Book
                        key={book.id}
                        book={book}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default BooksPage