import apiUrl from "../api/apiConfig";
import React, { useState, useEffect } from 'react';

const NotiCount = () => {
    const [quantity, setQuantity] = useState(0);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        if (userData) {
            const fetchQuantity = async () => {
                try {
                    const response = await fetch(`${apiUrl}/enroll/getNoti/${userData.user_id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch quantity');
                    }
                    const data = await response.json();
                    setQuantity(data.length);
                    localStorage.setItem("noti", JSON.stringify(data));
                } catch (error) {
                    console.error('Error fetching quantity:', error);
                }
            };

            fetchQuantity();
        }
    }, [userData]);

    return <span>{quantity < 9 ? quantity : '9+'}</span>;
};

export default NotiCount;
