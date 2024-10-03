export const calculateVoteRatio = (upvotes, downvotes) => {
    if (upvotes + downvotes === 0) {
      return 0;
    }
    return (upvotes / (upvotes + downvotes)) * 100;
  };
  
  export const getVoteRatioColor = (upvotes, downvotes) => {
    const ratio = calculateVoteRatio(upvotes, downvotes);
    if (ratio >= 80) return 'green';
    if (ratio >= 50) return 'orange';
    return 'red';
  };