import React from 'react';
import "../index.js"
import { useLocation, useNavigate} from 'react-router-dom';

const SuccessScreen = ({ score , timeTaken }) => {
  const location = useLocation();
  //  finalScore =new URLSearchParams(location.search).get('score');
   const navigate = useNavigate();


   const handleBackToHome = () =>{
    navigate('/');
   }
  return (
   
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-500">
     <div className="game-board p-20 border-4 square-lg bg-green-500">
      <h1 className="text-3xl mb-4">Congratulations!</h1>
      <p className="text-lg mb-2">Final Score: {score}</p>
      <p className="text-lg">Time Taken: {Math.floor(timeTaken / 60)}:{Math.floor(timeTaken % 60)}</p>
      <div  className='flex content-center justify-center my-10'>
       <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'onClick={handleBackToHome()}>
        Go Start-Again
       </button>
       </div>
    </div>
    </div>
  );
};

export default SuccessScreen;
