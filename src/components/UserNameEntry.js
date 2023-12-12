import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../index.css';


const UserNameEntry = ({ setUserName, startGame }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(name);
    startGame();
    navigate('/game');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
  <div className="p-4 space-y-4 border rounded-lg">
        <h1 className="text-xl font-bold">React Tiles</h1>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Enter Your Name
        </label>
      <input 
          type="text" 
          id="name" 
          name="name"
          value={name}
          onChange={handleNameChange}
          className="p-2 w-full border rounded-md"
        />
         <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded-md">
          Play
        </button>
    </div>
    </div>
  );
};

export default UserNameEntry;
