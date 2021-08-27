import { useState } from 'react';
import './Tile.css'

const Tile = ({ number, onClick, disabled = false }) => {
  const [opened, setOpened] = useState(false)

  const handleClick = () => {
    setOpened(true);

    if (onClick) {
      onClick(number)
    }
  }

  return (
    <>
      <button
        className={`tile ${opened ? 'opened' : ''}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {opened && number}
      </button>
    </>
  )
}

export default Tile;
