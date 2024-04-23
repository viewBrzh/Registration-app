import React, { useState } from 'react';
import apiUrl from '../api/apiConfig';

function FileUpload({ onFileUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
        await handleFileUpload(e.target.files[0]);
    };

    const handleFileUpload = async (file) => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${apiUrl}/upload/`, {
                method: 'POST',
                body: formData,
            });
            const imageName = await response.json();
            console.log('File uploaded successfully:', imageName);
            onFileUpload(imageName); // Send the image name back to the parent component
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="custom-input">
            <label htmlFor="file" className="input-label">
                Course File
            </label>
            <div className="input-wrapper">
                <input type="file" id="file" className="input-field" onChange={handleFileChange} />
            </div>
        </div>
    );
}

export default FileUpload;