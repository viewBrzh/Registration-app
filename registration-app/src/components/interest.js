import apiUrl from "../api/apiConfig";
import React, { useState, useEffect } from 'react';

const Interest = () => {
    const [interest, setInterest] = useState(0);
    const storedUserData = localStorage.getItem("userData");

    useEffect(() => {
        const fetchInterest = async () => {
            try {
                const response = await fetch(`${apiUrl}/interest/get/${storedUserData.user_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch interest');
                }
                const data = await response.json();
                setInterest(data);
            } catch (error) {
                console.error('Error fetching interest:', error);
            }
        };

        fetchInterest();
    }, [storedUserData.user_id]);

    return <span></span>;
};

export default Interest;