import React from 'react';
import './QuoteCard.css'
import { calculateVoteRatio, getVoteRatioColor } from './VoteUtils';


const QuoteCard = ({ quote, handleUpvote, handleDownvote, handleRemoveUpvote, handleRemoveDownvote }) => {
  return (
    <div className="quotecard">
      <div className="votecontainer">
        {quote.givenVote === 'upvote' ? (
          <button onClick={() => handleRemoveUpvote(quote.id)}>
            <i className="fas fa-angle-up"></i>
          </button>
        ) : (
          <button onClick={() => handleUpvote(quote.id)}>
            <i className="fas fa-caret-up"></i>
          </button>
        )}
        <p className='percent' style={{ color: getVoteRatioColor(quote.upvotesCount, quote.downvotesCount) }}>
          {(calculateVoteRatio(quote.upvotesCount, quote.downvotesCount)).toFixed(2)}%
        </p>
        <p className="ratio">{quote.upvotesCount} / {quote.downvotesCount}</p>
        {quote.givenVote === 'downvote' ? (
          <button onClick={() => handleRemoveDownvote(quote.id)}>
            <i className="fas fa-angle-down"></i>
          </button>
        ) : (
          <button onClick={() => handleDownvote(quote.id)}>
            <i className="fas fa-caret-down"></i>
          </button>
        )}
      </div>
      <div className="quotecontainer">
        <p className="quote">{quote.content}</p>
        <p className="author">-{quote.author}</p>
      </div>
    </div>
  );
};

export default QuoteCard;