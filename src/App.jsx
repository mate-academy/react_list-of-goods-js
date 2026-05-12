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

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const visibleGoods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  if (sortField === SORT_FIELD_ALPHABET) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  const sortByAlphabet = () => {
    setSortField(SORT_FIELD_ALPHABET);
  };

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const sortByLength = () => {
    setSortField(SORT_FIELD_LENGTH);
  };

  const toggleReverse = () => setIsReversed(prev => !prev);
  const isOriginalOrder = sortField === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={reset}
            type="button"
            className={`button is-danger ${sortField === '' ? '' : 'is-light'}`}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
