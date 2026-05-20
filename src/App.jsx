import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export function App() {
  const [goodsCopy, setGoodsCopy] = useState([...goodsFromServer]);
  const [lastChange, setLastChange] = useState('');

  const sortAlphabetically = () => {
    const copy = [...goodsFromServer].sort();

    setGoodsCopy(copy);
    setLastChange('alphabetic');
  };

  const sortByLength = () => {
    const copy = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoodsCopy(copy);
    setLastChange('length');
  };

  const reset = () => {
    setGoodsCopy([...goodsFromServer]);
    setLastChange('');
  };

  const reverse = () => {
    const copy = [...goodsCopy].reverse();

    setGoodsCopy(copy);

    if (lastChange === 'alphabetic') {
      setLastChange('reverse-alphabetic');
    } else if (lastChange === 'reverse-alphabetic') {
      setLastChange('alphabetic');
    } else if (lastChange === 'length') {
      setLastChange('reverse-length');
    } else if (lastChange === 'reverse-length') {
      setLastChange('length');
    } else if (lastChange === '') {
      setLastChange('reverse');
    } else if (lastChange === 'reverse') {
      setLastChange('');
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            lastChange === 'alphabetic' ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            lastChange === 'length' ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            lastChange.startsWith('reverse') ? '' : 'is-light'
          }`}
          onClick={reverse}
        >
          Reverse
        </button>

        {lastChange !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsCopy.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}
