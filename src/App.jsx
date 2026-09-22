import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';

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

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function sortGoods(goods, sortBy) {
  switch (sortBy) {
    case SORT_BY_ALPHABET:
      return [...goods].sort((a, b) => a.localeCompare(b));
    case SORT_BY_LENGTH:
      return [...goods].sort((a, b) => a.length - b.length);
    default:
      return goods;
  }
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortedGoods = reversed
    ? sortGoods([...goodsFromServer], sortType).reverse()
    : sortGoods([...goodsFromServer], sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_BY_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === SORT_BY_LENGTH ? '' : 'is-light'}`}

          onClick={() => {
            setSortType(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortType !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
