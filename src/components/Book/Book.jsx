import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book, onDelete, onEdit }) => {
  const { id, title, pageCount, author } = book;

  return (
    <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>{pageCount}</td>
        <td>{author.fullName}</td>
        <td>
        {onDelete && (
          <button onClick={() => onDelete(id)}>Delete</button>
        )}
      </td>
        <td>
          <button onClick={() => onEdit(id)}>Edit</button>
        </td>
    </tr>
  );
};

export default Book;