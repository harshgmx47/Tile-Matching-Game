import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import './GameBoard.css';

const GameBoard = ({ userName, finishGame }) => {
  const [tiles, setTiles] = useState(generateTiles());
  const [selectedTile, setSelectedTile] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState();
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (startTime) {
      const timerInterval = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime((currentTime - startTime) / 1000); // in seconds
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [startTime]);

  const startGame = () => {
    setStartTime(Date.now());
    // Additional setup logic if needed
  };

  // useEffect(() => {
  //   checkGameCompletion();
  // }, [tiles]);

  useEffect(() => {
    const checkGameCompletion = () => {
      const isGameComplete = tiles.every((row) =>
        row.every((tile) => tile.matched)
      );

      if (isGameComplete && startTime) {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds
        finishGame(score, timeTaken);
        navigate(`/success?score=${score}`); // Navigate to the success screen
      }
    };

    checkGameCompletion();
  }, [tiles, startTime, finishGame, navigate, score]);

  const handleTileClick = (id, symbol) => {
    if (!selectedTile) {
      setSelectedTile({ id, symbol });
    } else {
      if (selectedTile.symbol === symbol && selectedTile.id !== id) {
        handleMatchedTiles(id, selectedTile.id);
      } else {
        handleMismatchedTiles(id, selectedTile.id);
      }
      setSelectedTile(null);
    }
  };

  const handleMatchedTiles = (id1, id2) => {
    const newTiles = updateTiles(id1, id2, {revealed:true, matched: true });
    setTiles(newTiles);
    setScore((prevScore) => prevScore + 1);
  };

  const handleMismatchedTiles = (id1, id2) => {
    setTimeout(() => {
      const newTiles = updateTiles(id1, id2, { revealed: false ,matched: false});
      setTiles(newTiles);
      setScore((prevScore) => Math.max(0, prevScore - 1));
    }, 1000);
  };

  const updateTiles = (id1, id2, update) => {
    return tiles.map((row) =>
      row.map((tile) =>
        tile.id === id1 || tile.id === id2 ? { ...tile, ...update } : tile
      )
    );
  };

  return (
  
    <div className="min-h-screen flex flex-col content-center p-20 justify-evenly bg-gray">
      <h1 className='text-5xl font-bold flex items-center justify-center underline'>React Tiles</h1>

      <div className='flex flex-row justify-between'>
        <p className="text-lg underline mb-1">Score: {score}</p>
        <p className="text-lg ">
          Time: {Math.floor(elapsedTime / 60)}:{Math.floor(elapsedTime % 60)}
        </p>
      </div>


      <div className="game-board p-4 border-4 square-lg">
        <h1 className="text-3xl flex items-end justify-end underline mb-4">Hello, {userName}! Let's Play!</h1>
        <button onClick={startGame} className="bg-blue-400 text-white p-2 rounded-md mb-4">
          Start Game
        </button>
        {tiles.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row items-center justify-center ">
            {row.map((tile) => (
              <div
                key={tile.id}
                autoComplete="off"
                className={`tile ${tile.matched ? 'bg-green-300' : 'bg-blue-300'} 
                ${tile.revealed ? 
                'border-2 border-solid border-gray-500 bg-yellow-200' : 'border-2'} 
                m-2 p-8 flex items-center justify-center cursor-pointer`}
                onClick={() => {
                  if(startTime !== undefined){
                    if (!tile.matched && !tile.revealed) {
                      
                    const newTiles = updateTiles(tile.id, tile.symbol, { revealed: true });
                    setTiles(newTiles);
                    handleTileClick(tile.id, tile.symbol);
                  }
                  }
                
                }}
              >
                {tile.revealed ? <span className="text-xl font-bold">{tile.symbol}</span> : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to generate a random 4x8 array of tiles
const generateTiles = () => {
  const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
  if (symbols.length % 2 !== 0) {
    console.error('Error: The number of symbols must be even.');
    return [];
  }
  const tilePairs = symbols.concat(symbols);
  const shuffledTiles = tilePairs.sort(() => Math.random() - 0.5);
  console.log('Shuffled Tiles:', shuffledTiles);

  return Array.from({ length: 4 }, (_, rowIndex) =>
    Array.from({ length: 8 }, (_, colIndex) => ({
      id: `${rowIndex}-${colIndex}`,
      symbol: shuffledTiles[rowIndex * 8 + colIndex  ],
      matched: false,
      revealed: false,
      
    }))
  );
};

// Example arrays
const array1 = ["M", "P", "O", "G", "C", "M", "I", "H", "E", "D", "K", "B", "J", "I", "A", "L", "D", "F", "A", "K", "B", "O", "G", "F", "N", "J", "E", "N", "L", "H", "P", "C"];
const array2 = ["G", "F", "J", "B", "D", "K", "C", "F", "H", "I", "M", "O", "K", "A", "E", "D", "A", "B", "H", "L", "P", "N", "M", "J", "E", "L", "N", "P", "C", "G", "O", "I"];

// Combine arrays
const combinedArray = [...array1, ...array2];

// Check for matching pairs
const symbolCount = {};
let allPairsExist = true;

// Count occurrences of each symbol
combinedArray.forEach((symbol) => {
  symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
});

// Check if each symbol has a matching pair
Object.keys(symbolCount).forEach((symbol) => {
  if (symbolCount[symbol] % 2 !== 0) {
    console.error(`Error: Symbol '${symbol}' does not have a matching pair.`);
    allPairsExist = false;
  }
});

if (allPairsExist) {
  console.log('All symbols have matching pairs.');
} else {
  console.log('Some symbols do not have matching pairs.');
}
export default GameBoard;
