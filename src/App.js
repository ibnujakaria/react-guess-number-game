import './App.css';
import { useState } from 'react';
import InputNumber from './containers/InputNumber';
import GameBoard from './containers/GameBoard';

function App() {
  const [numberToGuess, setNumberToGuess] = useState(null);

  const handleReset = () => {
    setNumberToGuess(null)
  }

  return (
    <div className="App">
      <h1>
        Guess Number
      </h1>
    
      {numberToGuess === null && (
        <InputNumber
          onStart={setNumberToGuess}
        />
      )}

      {numberToGuess !== null && (
        <div className="control">
          <div className="number-to-guest">
            Number: {numberToGuess}
          </div>
          <button
            onClick={handleReset}
            className='reset'
          >
            Reset
          </button>
        </div>
      )}

      <GameBoard
        numberToGuess={numberToGuess}
      />
    </div>
  );
}

export default App;
