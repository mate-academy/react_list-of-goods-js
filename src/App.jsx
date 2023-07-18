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

const SORT_BY_LENGTH = 'length';
const SORT_BY_NAME = 'name';
const REVERSE = 'reverse';
const RESET = 'reset';

const LIGHT_COLOR_STYLE = 'is-light';

function preparedGoods(goods, { sortBy, order = '' }) {
  const newGoods = [...goods];

  if (sortBy) {
    newGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        case RESET:
        default:
          return 0;
      }
    });
  }

  if (order === REVERSE) {
    return newGoods.reverse();
  }

  return newGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const goodsForSort = preparedGoods(goodsFromServer, {
    sortBy: sortField, order: sortOrder,
  });

  const reverseGoods = () => {
    if (sortOrder === REVERSE) {
      setSortOrder('');
    } else {
      setSortOrder(REVERSE);
    }
  };

  const resetGoods = () => {
    setSortField(RESET);
    setSortField('');
    setSortOrder('');
  };

  const Reset = () => (
    <button
      type="button"
      onClick={resetGoods}
      className="button is-danger is-light"
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_NAME)}
          className={`button is-info ${sortField === SORT_BY_NAME ? '' : LIGHT_COLOR_STYLE}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : LIGHT_COLOR_STYLE}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-warning ${sortOrder === REVERSE ? '' : LIGHT_COLOR_STYLE}`}
        >
          Reverse
        </button>

        {(sortField || sortOrder) && <Reset />}
      </div>

      <ul>
        {goodsForSort.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
