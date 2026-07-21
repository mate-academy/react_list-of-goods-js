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

  const handleSortAlphabetically = () => {
    const copy = [...goodsFromServer].sort();

    if (
      lastChange === 'reverse' ||
      lastChange === 'reverse-alphabetic' ||
      lastChange === 'reverse-length'
    ) {
      copy.reverse();
      setLastChange('reverse-alphabetic');
    } else {
      setLastChange('alphabetic');
    }

    setGoodsCopy(copy);
  };

  const handleSortByLength = () => {
    const copy = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (
      lastChange === 'reverse' ||
      lastChange === 'reverse-alphabetic' ||
      lastChange === 'reverse-length'
    ) {
      copy.reverse();
      setLastChange('reverse-length');
    } else {
      setLastChange('length');
    }

    setGoodsCopy(copy);
  };

  const resetGoods = () => {
    setGoodsCopy([...goodsFromServer]);
    setLastChange('');
  };

  const handleReverse = () => {
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
            lastChange.includes('alphabetic') ? '' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            lastChange.includes('length') ? '' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            lastChange.startsWith('reverse') ? '' : 'is-light'
          }`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {lastChange !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
