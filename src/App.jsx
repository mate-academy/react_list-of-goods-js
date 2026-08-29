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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const newArrOfGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    newArrOfGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === 'length') {
    newArrOfGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed === true) {
    newArrOfGoods.reverse();
  }

  const sortByAlphabet = () => {
    setSortType('alphabet');
  };

  const sortByLength = () => {
    setSortType('length');
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabet}
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType !== '' || isReversed) && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {newArrOfGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
