import React from 'react';

const SuccessScreen = ({ finalScore, timeTaken }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl mb-4">Congratulations!</h1>
      <p className="text-lg mb-2">Final Score: {finalScore}</p>
      <p className="text-lg">Time Taken: {Math.floor(timeTaken / 60)}:{Math.floor(timeTaken % 60)}</p>
      {/* Add any additional content or styling as needed */}
    </div>
  );
};

export default SuccessScreen;
