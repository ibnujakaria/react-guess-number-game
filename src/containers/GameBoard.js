import { useEffect, useState } from 'react';
import Tile from '../components/Tile';
import './GameBoard.css'
import YouLose from './YouLose';
import YouWin from './YouWin';

const GameBoard = ({ numberToGuess }) => {
  const defaultChance = 3

  const [randomNumbers, setRandomNumbers] = useState([]);
  const [remainingChances, setRemainingChances] = useState(defaultChance);
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleWin = () => {
    setIsWin(true)
    setTimeout(() => setShowMessage(true), 1000)
  }
  
  const handleLose = () => {
    setIsLose(true)
    setTimeout(() => setShowMessage(true), 1000)
  }

  // random the numbers
  useEffect(() => {
    const numbers = []
    const min = numberToGuess - (numberToGuess % 10)
    const max = min + 10

    for (let i = 0; i < 8; i++) {
      let number = null;

      do {
        number = Math.floor(Math.random() * (max - min) + min)
      } while (number === numberToGuess || numbers.includes(number));

      numbers.push(number)
    }

    // inject number to guess in the array
    const randomIndex = Math.floor(Math.random() * 9)
    numbers.splice(randomIndex, 0, numberToGuess)

    setRandomNumbers(numbers)
    setRemainingChances(defaultChance)
    setIsWin(false)
    setIsLose(false)
    setShowMessage(false)
  }, [numberToGuess])

  const handleTileClick = (number) => {
    if (number === numberToGuess) {
      handleWin()
    } else {
      setRemainingChances(_chance => _chance - 1)
    }
  }

  useEffect(() => {
    if (remainingChances < 1) {
      handleLose()
    }
  }, [remainingChances])

  return (
    <>
      <section
        key={numberToGuess}
        className="game-board"
      >
        <div className="tiles">
        {numberToGuess !== null && randomNumbers.map((number) => (
          <Tile
            number={number}
            onClick={handleTileClick}
            disabled={isWin || isLose}
            isCorrect={number === numberToGuess}
            forceOpen={isLose}
          />
        ))}
        </div>

        {showMessage && isWin && <YouWin />}
        {showMessage && isLose && <YouLose />}
      </section>
    </>
  )
}

export default GameBoard;
