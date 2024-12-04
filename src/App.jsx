/* eslint-disable prettier/prettier */
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_RESET = 'reset';

export const App = () => {
  const [viewGoods, setViewGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabetic = () => {
    setSortField(SORT_FIELD_ALPHABETICALLY);
    const sortedGoods = [...goodsFromServer].sort((good1, good2) =>
      good1.localeCompare(good2));

    setViewGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
  };

  const sortByLength = () => {
    setSortField(SORT_FIELD_LENGTH);
    const sortedGoods = [...goodsFromServer].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setViewGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
  };

  const sortReverse = () => {
    setIsReversed(prev => !prev);
    setViewGoods([...viewGoods].reverse());
  };

  const sortReset = () => {
    setSortField(SORT_FIELD_RESET);
    setIsReversed(false);
    setViewGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortField !== SORT_FIELD_ALPHABETICALLY ? ' is-light' : ''}`}
          onClick={sortByAlphabetic}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortField !== SORT_FIELD_LENGTH ? ' is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${!isReversed ? ' is-light' : ''}`}
          onClick={sortReverse}
        >
          Reverse
        </button>

        {viewGoods.join() !== goodsFromServer.join() && (
          <button
            type="button"
            className={`button is-danger${sortField !== SORT_FIELD_RESET ? ' is-light' : ''}`}
            onClick={sortReset}
          >
            Reset
          </button>
        )}
      </div>

      {viewGoods.map(good => (
        <ul key={good}>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};
