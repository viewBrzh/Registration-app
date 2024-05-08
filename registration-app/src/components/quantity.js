import apiUrl from "../api/apiConfig";
import React, { useState, useEffect } from 'react';

const Quantity = ({ courseId }) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchQuantity = async () => {
            try {
                const response = await fetch(`${apiUrl}/course/${courseId}/enrollCount`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quantity');
                }
                const data = await response.json();
                setQuantity(data.enrollCount);
            } catch (error) {
                console.error('Error fetching quantity:', error);
            }
        };

        fetchQuantity();
    }, [courseId]);

    return <span>{quantity}</span>;
};

export default Quantity;