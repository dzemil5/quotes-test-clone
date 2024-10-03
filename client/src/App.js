import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from './components/Login/AuthContext';
import QuoteList from './components/Quotes/QuoteList';
import Login from './components/Login/Login';

const App = () => {
  const { isLoggedIn, accessToken } = useContext(AuthContext);

  return (
    <div>
      {isLoggedIn ? (
        <QuoteList isLoggedIn={isLoggedIn} accessToken={accessToken} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
