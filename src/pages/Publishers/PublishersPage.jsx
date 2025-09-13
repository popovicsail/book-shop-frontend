import React, { useState, useEffect } from 'react'
import Publisher from '../../components/Publisher/Publisher';
import { getAllPublishers } from '../../services/PublisherServices/PublisherServices';

const PublishersPage = () => {
    const [publishers, setPublishers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const data = await getAllPublishers();
                setPublishers(data);
            } catch (err) {
                setError('ERROR: fetchPublishers.');
            }
        };
        fetchPublishers();
    }, []);

    return (
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
    );
}

export default PublishersPage