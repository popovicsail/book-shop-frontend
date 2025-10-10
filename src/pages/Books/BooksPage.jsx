import React, { useState, useEffect } from 'react'
import Book from '../../components/Book/Book';
import { getPagedBooks, deleteBook, updateBook } from '../../services/BookServices/BookServices';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu'
import FilterSection from '../../components/Common/FilterSection'

const BooksPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        items: [],
        count: 0,
        currentPage: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false
    });

    const [queryParameters, setQueryParameters] = useState({
        currentPage:1,
        pageSize: 5,
        orderBy: "Title asc",
        title: null,
        authorId: null, 
        authorFullName: null,
        authorDateOfBirthFrom: null,
        authorDateOfBirthTo: null,
        publishedDateTo: null,
        publishedDateFrom: null
    })

    const [bookDeleted, setBookDeleted] = useState(false);

    useEffect(() => {
        const fetchPagedBooks = async () => {
            setIsLoading(true);
            setError(null);
            setBookDeleted(false)

            try {
                const data = await getPagedBooks(queryParameters);

                if (data.items.length === 0 && currentPage > 1) {
                    setQueryParameters(prev => ({
                    ...prev,
                    currentPage: prev.currentPage - 1 
                }));
                    return; 
                }

                setData(data);
            } catch (err) {
                setError('ERROR: getPagedBooks.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPagedBooks();
    }, [queryParameters, bookDeleted]);

    const handleFilterChange = (newFilters) => {
    const updatedQuery = {
        ...queryParameters, 
        ...newFilters, 
        currentPage: 1 
    };
    
    setQueryParameters(updatedQuery);
};

    const handleDelete = async (bookId) => {
        try {
            await deleteBook(bookId);
            setBookDeleted(true);

        } catch (err) {
            setError('ERROR: deleteBook.');
        }
    };

    const handleEdit = (bookId) => {
        navigate(`/books/edit/${bookId}`)
    }

    const handlePreviousPage = () => {
        if (data.hasPreviousPage) {
            setQueryParameters(prev => ({...prev, currentPage: prev.currentPage - 1}));
        }
    };

    const handleNextPage = () => {
        if (data.hasNextPage) {
            setQueryParameters(prev => ({...prev, currentPage: prev.currentPage + 1}));
        }
    };

    if (error) {
        return <p style={{ color: 'red' }}>Greška: {error}</p>;
    }

    if (isLoading && data.items.length === 0) {
        return <p>Učitavanje knjiga...</p>;
    }

    if (data.items.length === 0) {
        return <p>Nema pronađenih knjiga.</p>;
    }

    return (
        <>
        <FilterSection onFilter={handleFilterChange} currentFilters={queryParameters} /> 
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
                    {data.items.map(book => (
                        <Book
                            key={book.id}
                            book={book}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </tbody>
            </table>

            {data.hasPreviousPage && <button onClick={() => handlePreviousPage()}>PreviousPage</button>}
            {data.hasNextPage && <button onClick={() => handleNextPage()}>NextPage</button>}
            <p>Current Page: {data.currentPage}</p>
            <p>Total Pages: {data.totalPages}</p>

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