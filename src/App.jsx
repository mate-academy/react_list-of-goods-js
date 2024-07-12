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

const SORT_BY_NAME = {
  abc: 'abc',
  length: 'length',
};

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SORT_BY_NAME.abc) {
        return good1.localeCompare(good2);
      }

      if (sortField === SORT_BY_NAME.length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortName, setSortName] = useState('');
  const [reverse, setReverse] = useState(false);
  const newGoods = getPreparedGoods(goodsFromServer, {
    sortField: sortName,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortName(SORT_BY_NAME.abc)}
          type="button"
          className={`button is-info ${sortName !== SORT_BY_NAME.abc && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortName(SORT_BY_NAME.length)}
          type="button"
          className={`button is-success ${sortName !== SORT_BY_NAME.length && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortName || reverse) && (
          <button
            onClick={() => {
              setSortName('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {newGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
