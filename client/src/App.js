import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from './components/Login/AuthContext';
import QuoteList from './components/Quotes/QuoteList';
import Login from './components/Login/Login';
import Loading from './components/Loading/Loading';

const App = () => {
  const { isLoggedIn, accessToken, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {isLoggedIn ? (
        <QuoteList accessToken={accessToken} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;