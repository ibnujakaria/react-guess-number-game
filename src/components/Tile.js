import { useState } from 'react';
import './Tile.css'

const Tile = ({ number, onClick, isCorrect, forceOpen, disabled = false }) => {
  const [opened, setOpened] = useState(false)

  const handleClick = () => {
    setOpened(true);

    if (onClick) {
      onClick(number)
    }
  }

  const getClasses = () => {
    if (opened) {
      if (isCorrect) {
        return 'opened correct'
      }

      return 'opened'
    }

    if (forceOpen && isCorrect) {
      return 'correct'
    }

    return ''
  }

  return (
    <>
      <button
        className={`tile ${getClasses()}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {(opened || (forceOpen && isCorrect)) && number}
      </button>
    </>
  )
}

export default Tile;
