import React, {useState} from 'react';

const BookForm = ({onSubmit, bookToEdit}) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <>
            {isEditing ? <p>books/edit/${bookToEdit}</p> : <p>books/add</p>}
        </>    
    )
}

export default BookForm