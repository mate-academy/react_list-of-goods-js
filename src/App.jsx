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

const SORT_FIELD_LIGHT = 'is-light';

function getPreparedGoods(goods, { sortField, sortedLength, isReversed }) {
  let preparedGoods = [...goods];

  if (sortField === 'alpha') {
    preparedGoods = [...preparedGoods].sort(
      (good1, good2) => good1.localeCompare(good2),
    );
  }

  if (sortedLength === 'length') {
    preparedGoods = [...preparedGoods].sort(
      (good1, good2) => good1.length - good2.length,
    );
  }

  if (isReversed) {
    preparedGoods = [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortedLength, setSortedLength] = useState('');
  const [isReversed, setIsReversed] = useState('');

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, sortedLength, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === 'alpha' ? 'button is-info'
            : `button is-info ${SORT_FIELD_LIGHT}`}
          onClick={() => {
            setSortField('alpha');
            setSortedLength('');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortedLength === 'length' ? 'button is-success'
            : `button is-success ${SORT_FIELD_LIGHT}`}
          onClick={() => {
            setSortedLength('length');
            setSortField('');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : `button is-warning ${SORT_FIELD_LIGHT}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || sortedLength || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortedLength('');
              setIsReversed('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
