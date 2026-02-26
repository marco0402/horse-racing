import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHello = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hello');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data from backend');
        }
        
        const data = await response.json();
        setMessage(data.message);
        setTimestamp(data.timestamp);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMessage('');
        setTimestamp('');
      } finally {
        setLoading(false);
      }
    };

    fetchHello();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World App</h1>
        
        {loading && <p className="loading">Loading...</p>}
        
        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <p>Make sure the backend is running on http://localhost:8080</p>
          </div>
        )}
        
        {message && !loading && (
          <div className="message-box">
            <h2>{message}</h2>
            <p className="timestamp">Timestamp: {timestamp}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
