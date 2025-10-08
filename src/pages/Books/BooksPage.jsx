import React, { useState, useEffect } from 'react'
import Book from '../../components/Book/Book';
import { getAllBooks, deleteBook, updateBook } from '../../services/BookServices/BookServices';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu'

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [orderBy, setOrderBy] = useState("title asc")

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooks(orderBy);
                setBooks(data);
            } catch (err) {
                setError('ERROR: fetchBooks.');
            }
        };
        fetchBooks();
    }, [orderBy]);

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
        <>
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

            <DropdownMenu title="Izaberi akciju">
                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('title asc')}
                >
                    title asc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('title desc')}
                >
                    title desc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('PublishedDate asc')}
                >
                    PublishedDate asc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('PublishedDate desc')}
                >
                    PublishedDate desc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('author.fullname asc')}
                >
                    AuthorName asc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('author.fullname desc')}
                >
                    AuthorName desc
                </p>

            </DropdownMenu>
        </>
    );
}

export default BooksPage