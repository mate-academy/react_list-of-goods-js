import React, { useState } from 'react';
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

function sortGoods(goods, sortField) {
  switch (sortField) {
    case 'alphabetically':
      goods.sort((a, b) => a.localeCompare(b));
      break;
    case 'SortByLength':
      goods.sort((a, b) => a.length - b.length);
      break;
    default:
      return [...goodsFromServer];
  }

  return goods;
}

export const App = () => {
  const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
  const SORT_FIELD_BY_LENGTH = 'SortByLength';

  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = sortGoods([...goodsFromServer], sortField);

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABETICALLY ? 'is-light' : ''}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_BY_LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => {
            setReversed(!reversed);
            setSortField(sortField);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
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
