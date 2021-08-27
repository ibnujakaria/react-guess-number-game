import { useEffect, useState } from 'react';
import Tile from '../components/Tile';
import './GameBoard.css'
import YouLose from './YouLose';
import YouWin from './YouWin';

const GameBoard = ({ numberToGuess }) => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [remainingChances, setRemainingChances] = useState(3);
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  const handleWin = () => {
    setIsWin(true)
  }

  const handleLose = () => {
    setIsLose(true)
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
    setRemainingChances(3)
    setIsWin(false)
    setIsLose(false)
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
      <section className="game-board">
        <div className="tiles">
        {numberToGuess !== null && randomNumbers.map((number) => (
          <Tile
            number={number}
            onClick={handleTileClick}
            disabled={isWin || isLose}
          />
        ))}
        </div>

        {isWin && <YouWin />}
        {isLose && <YouLose />}
      </section>
    </>
  )
}

export default GameBoard;
