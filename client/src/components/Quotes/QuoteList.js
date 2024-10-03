import React, { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard';
import { calculateVoteRatio, getVoteRatioColor } from './VoteUtils';
import axios from 'axios';


const QuoteList = ({ isLoggedIn, accessToken }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/quotes', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setQuotes(response.data.quotes);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [accessToken]);

  const handleUpvote = async (quoteId) => {
    try {
      if (quotes.find((quote) => quote.id === quoteId).givenVote === 'downvote') {
        await axios.delete(`http://localhost:8000/quotes/${quoteId}/downvote`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      const response = await axios.post(`http://localhost:8000/quotes/${quoteId}/upvote`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedQuotes = quotes.map((quote) => {
        if (quote.id === quoteId) {
          return response.data;
        }
        return quote;
      });
      setQuotes(updatedQuotes);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownvote = async (quoteId) => {
    try {
      if (quotes.find((quote) => quote.id === quoteId).givenVote === 'upvote') {
        await axios.delete(`http://localhost:8000/quotes/${quoteId}/upvote`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      const response = await axios.post(`http://localhost:8000/quotes/${quoteId}/downvote`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedQuotes = quotes.map((quote) => {
        if (quote.id === quoteId) {
          return response.data;
        }
        return quote;
      });
      setQuotes(updatedQuotes);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemoveUpvote = async (quoteId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/quotes/${quoteId}/upvote`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedQuotes = quotes.map((quote) => {
        if (quote.id === quoteId) {
          return response.data;
        }
        return quote;
      });
      setQuotes(updatedQuotes);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRemoveDownvote = async (quoteId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/quotes/${quoteId}/downvote`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedQuotes = quotes.map((quote) => {
        if (quote.id === quoteId) {
          return response.data;
        }
        return quote;
      });
      setQuotes(updatedQuotes);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {quotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          handleRemoveUpvote={handleRemoveUpvote}
          handleRemoveDownvote={handleRemoveDownvote}
        />
      ))}
    </div>
  );
};

export default QuoteList;