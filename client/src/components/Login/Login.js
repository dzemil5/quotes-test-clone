import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import './Login.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { isLoggedIn, setIsLoggedIn, setAccessToken } = useContext(AuthContext);


  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/sessions', { username, password })
      .then((response) => {
        if (response.status === 200) {
          const accessToken = response.data.accessToken;
          setAccessToken(accessToken);
          setIsLoggedIn(true);
        } else {
          setError('Invalid username or password');
        }
      })
      .catch((error) => {
        setError('Error logging in');
      });
  };


  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setAccessToken(null); 
  };


  return (
    <div className='login'>
      <h1>Login</h1>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
};


export default Login;