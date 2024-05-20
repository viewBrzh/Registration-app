import apiUrl from "../api/apiConfig";
import React, { useState, useEffect } from 'react';

const NotiCount = () => {
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [alertCount, setAlertCount] = useState(0);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        if (userData) {
            const fetchQuantities = async () => {
                try {
                    const [notiResponse, userNotiResponse] = await Promise.all([
                        fetch(`${apiUrl}/enroll/getNoti/${userData.user_id}`),
                        fetch(`${apiUrl}/enroll/getUserNoti/${userData.user_id}`)
                    ]);

                    if (!notiResponse.ok || !userNotiResponse.ok) {
                        throw new Error('Failed to fetch notifications');
                    }

                    const notiData = await notiResponse.json();
                    const userNotiData = await userNotiResponse.json();

                    setFeedbackCount(notiData.length);
                    setAlertCount(userNotiData.length);

                    const combinedData = {
                        feedback: notiData,
                        alert: userNotiData
                    };

                    localStorage.setItem("noti", JSON.stringify(combinedData));
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            };

            fetchQuantities();
        }
    }, [userData]);

    const totalCount = feedbackCount + alertCount;

    return <span>{totalCount < 9 ? totalCount : '9+'}</span>;
};

export default NotiCount;
