import React from 'react';
import { Link } from 'react-router-dom';

const Publisher = ({ publisher}) => {
  const { id, name, address, website } = publisher;

  return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{address}</td>
        <td>{website}</td>
    </tr>
  );
};

export default Publisher;