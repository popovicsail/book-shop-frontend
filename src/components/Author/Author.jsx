import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ author }) => {
  const { id, fullName } = author;

  return (
    <tr>
        <td>{id}</td>
        <td>{fullName}</td>
    </tr>
  );
};

export default Book;