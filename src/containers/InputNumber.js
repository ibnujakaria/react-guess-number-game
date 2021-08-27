import { useState } from 'react';
import './InputNumber.css'

const InputNumber = ({ onStart }) => {
  const [number, setNumber] = useState(null);

  return (
    <>
      <section className="input">
        <label>
          Input Number to Guess:
        </label>

        <input
          type="number"
          onInput={e => setNumber(e.target.value)}
        />

        <button
          onClick={() => onStart(parseInt(number))}
        >
          Start
        </button>
      </section>
    </>
  )
}

export default InputNumber;
