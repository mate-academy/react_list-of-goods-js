import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const goodsFromServer = [
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

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'by length';

function getPreparedGoods(goods, sortBy) {
  if (sortBy === SORT_BY_ALPHABET) {
    return [...goods].sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortBy === SORT_BY_LENGTH) {
    return [...goods].sort((good1, good2) => good1.length - good2.length);
  }

  return [...goods];
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  let preparedGoods = getPreparedGoods(goodsFromServer, sortField);

  preparedGoods = isReversed ? preparedGoods.toReversed() : preparedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_BY_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
