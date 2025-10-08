import React, { useState, useEffect } from 'react'
import Publisher from '../../components/Publisher/Publisher';
import { getAllPublishers } from '../../services/PublisherServices/PublisherServices';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu'

const PublishersPage = () => {
    const [publishers, setPublishers] = useState([]);
    const [error, setError] = useState(null);
    const [orderBy, setOrderBy] = useState("name asc")

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const data = await getAllPublishers(orderBy);
                setPublishers(data);
            } catch (err) {
                setError('ERROR: fetchPublishers.');
            }
        };
        fetchPublishers();
    }, [orderBy]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.map(publisher => (
                        <Publisher
                            key={publisher.id}
                            publisher={publisher}
                        />
                    ))}
                </tbody>
            </table>

            <DropdownMenu title="Izaberi akciju">
                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('name asc')}
                >
                    Name asc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('name desc')}
                >
                    Name desc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('address asc')}
                >
                    Address asc
                </p>

                <p
                    className="dropdown-item"
                    onClick={() => setOrderBy('address desc')}
                >
                    Address desc
                </p>
            </DropdownMenu>
        </>
    );
}

export default PublishersPage