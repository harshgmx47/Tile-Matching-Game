import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserNameEntry from './components/UserNameEntry';
import GameBoard from './components/GameBoard';
import SuccessScreen from './components/SuccessScreen';

function App() {
  const [userName, setUserName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    // setStartTime(Date.now());
    // Additional setup logic if needed
  };

  const finishGame = (finalScore, finalTime) => {
    setGameFinished(true);
    setScore(finalScore);
    setTimeTaken(finalTime);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setScore(0);
    setTimeTaken(0);
    // Additional reset logic if needed
  };

  return (
    
    
 
    <Router>
    <Routes>
      <Route path="/" element={
        !gameStarted && !gameFinished && (
        <UserNameEntry
          setUserName={setUserName}
          startGame={startGame}
        />
      )} />
      <Route path="/game" element={gameStarted && !gameFinished && (
        <GameBoard
          userName={userName}
          finishGame={finishGame}
        />
      )} />
      <Route path="/success" element={ gameFinished && (
        <SuccessScreen
          userName={userName}
          score={score}
          timeTaken={timeTaken}
          resetGame={resetGame}
        />
      )
      } />
    </Routes>
  </Router>

  );
}

export default App;
