import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthorsPaged } from '../../services/AuthorServices/AuthorServices';
import Author from '../../components/Author/Author'

const AuthorsPage = () => {
    const [pagedAuthors, setPagedAuthors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [orderBy, setOrderBy] = useState("fullName asc");

    useEffect(() => {
        const fetchAuthors = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getAuthorsPaged(currentPage, pageSize, orderBy);
                setPagedAuthors(data);
            }
            catch (err) {
                console.error("ERROR: fetchAuthors");
                setError('ERROR: fetchAuthors');
                setPagedAuthors(null)
            } finally {
                setLoading(false)
            }
        }
        fetchAuthors();
    }, [currentPage, pageSize, orderBy])

    const handlePreviousPage = () => {
        if (pagedAuthors.hasPreviousPage) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (pagedAuthors.hasNextPage) {
            setCurrentPage(prev => prev + 1)
        }
    }

    if (loading && !pagedAuthors) {
        return <p>Učitavanje autora...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Greška: {error}</p>;
    }

    if (!pagedAuthors || pagedAuthors?.items?.length === 0) {
        return <p>Nema pronađenih autora.</p>;
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>FullName</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedAuthors.items.map(author => (
                        <Author
                            key={author.id}
                            author={author}
                        />
                    ))}
                </tbody>             
            </table>        
            {pagedAuthors.hasPreviousPage && <button onClick={() => handlePreviousPage()}>PreviousPage</button>}
            {pagedAuthors.hasNextPage && <button onClick={() => handleNextPage()}>NextPage</button>}
            <p>Current Page: {pagedAuthors.pageIndex}</p>
            <p>Total Pages: {pagedAuthors.totalPages}</p>
        </>
    )
}
export default AuthorsPage