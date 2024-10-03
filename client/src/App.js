import React, { useContext } from 'react';
import './App.css';


import { AuthContext } from './components/Login/AuthContext';
import QuoteList from './components/Quotes/QuoteList';
import Login from './components/Login/Login';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <div>
        <h1>Quotes</h1>
        <QuoteList />
      </div>
    );
  } else {
    return <Login />;
  }
};

export default App;
