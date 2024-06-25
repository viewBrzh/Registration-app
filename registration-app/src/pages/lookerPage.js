// LookerPage.js
import React, { useContext, useEffect, useState } from 'react';
import { ExtensionContext40 } from '@looker/extension-sdk-react';

const LookerPage = () => {
  const { extensionSDK } = useContext(ExtensionContext40);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await extensionSDK.fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [extensionSDK]);

  return (
    <div>
      <h1>Looker Page</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LookerPage;
