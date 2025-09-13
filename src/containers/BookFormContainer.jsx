import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../pages/BookForm/BookForm'

const BookFormContainer = () => {
    const { bookId } = useParams();
    const [ bookToEdit, setBookToEdit ] = useState("TEMP_BOOK_TO_EDIT")

    const handleBookSubmit = () => {
        return <p>Book Submitted or Edited!</p>
    }

    return (
        <>
            <BookForm
                onSubmit={handleBookSubmit}
                bookToEdit={bookToEdit}
            />
            
        </>
    )
}

export default BookFormContainer