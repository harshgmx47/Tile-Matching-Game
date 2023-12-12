import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './GameBoard.css'

const GameBoard = ({ userName, finishGame }) => {
  const [tiles, setTiles] = useState(generateTiles());
  const [selectedTile, setSelectedTile] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = Date.now();
      setElapsedTime((currentTime - startTime) / 1000); // in seconds
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [startTime]);

  const startGame = () => {
    setStartTime(Date.now());
    // Additional setup logic if needed
  };


  // Function to generate a random 4x8 array of tiles
  function generateTiles() {
    // This is a simple example; you can customize this based on your actual tiles and logic
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const tilePairs = symbols.concat(symbols);
    const shuffledTiles = tilePairs.sort(() => Math.random() - 0.5);

    return Array.from({ length: 4 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, colIndex) => ({
        id: `${rowIndex}-${colIndex}`,
        symbol: shuffledTiles[rowIndex * 4 + colIndex],
        matched: false,
        revealed: false,
      }))
    );
  }

  const handleTileClick = (id, symbol) => {
    if (!selectedTile) {
      // First tile selected
      setSelectedTile({ id, symbol });
    } else {
      // Second tile selected
      if (selectedTile.symbol === symbol && selectedTile.id !== id) {
        // Match found
        const newTiles = tiles.map((row) =>
          row.map((tile) =>
            tile.id === id || tile.id === selectedTile.id
              ? { ...tile, matched: true }
              : tile
          )
        );
        setTiles(newTiles);
        setScore((prevScore) => prevScore + 1);
      } else {
        // No match
        setTimeout(() => {
          const newTiles = tiles.map((row) =>
            row.map((tile) =>
              tile.id === id || tile.id === selectedTile.id
                ? { ...tile, revealed: false }
                : tile
            )
          );
          setTiles(newTiles);
          setScore((prevScore) => Math.max(0, prevScore - 1));
        }, 1000);
      }

      setSelectedTile(null);
    }
  };

   const checkGameCompletion = () => {
    const isGameComplete = tiles.every((row) =>
      row.every((tile) => tile.matched)
    );

    if (isGameComplete) {
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds
      finishGame(score, timeTaken);
      navigate('/success'); // Navigate to the success screen
    }
  };

  // Check for game completion whenever tiles change
  React.useEffect(() => {
    checkGameCompletion();
  }, [tiles]);

  return (
    <div className="min-h-screen flex flex-col content-center p-20  justify-evenl bg-gray-100">

    <h1 className='text-5xl font-bold flex items-center justify-center underline'>React Tiles</h1>
      
      <div className='flex flex-row justify-between '>
      <p className="text-lg     underline mb-1">Score: {score}</p>
          <p className="text-lg ">
            Time: {Math.floor(elapsedTime / 60)}:{Math.floor(elapsedTime % 60)}
          </p>
        </div>
      <div className="game-board p-4 border-4 square-lg">
      <h1 className="text-3xl flex items-end justify-end underline mb-4">Hello, {userName}! Let's Play!</h1>
        {tiles.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center ">
            {row.map((tile) => (
              <div
                key={tile.id}
                className={`tile ${
                  tile.matched ? 'bg-green-500' : 'bg-blue-500'
                } ${
                  tile.revealed
                    ? 'border-2 border-solid border-gray-300'
                    : 'border-2'
                } m-2 p-8 flex items-center justify-center cursor-pointer`}
                onClick={() => {
                  if (!tile.matched && !tile.revealed) {
                    const newTiles = tiles.map((r) =>
                      r.map((t) =>
                        t.id === tile.id ? { ...t, revealed: true } : t
                      )
                    );
                    setTiles(newTiles);
                    handleTileClick(tile.id, tile.symbol);
                  }
                }}
              >
                {tile.revealed ? (
                  <span className="text-xl font-bold">{tile.symbol}</span>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
