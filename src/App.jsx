import { useState } from 'react';
import 'bulma/css/bulma.css';
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
const SORT_FIELD_ALPHABET = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, isReverse) {
  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (sortField === SORT_FIELD_ALPHABET && !isReverse) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SORT_FIELD_ALPHABET && isReverse) {
    preparedGoods.sort((good1, good2) => good2.localeCompare(good1));
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
          className={`button is-info ${sortField === SORT_FIELD_ALPHABET ? '' : `is-light`}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
            setIsReversed(false);
          }}
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : `is-light`}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
          className={`button is-warning ${isReverse ? '' : `is-light`}`}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            className="button is-danger is-light"
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
