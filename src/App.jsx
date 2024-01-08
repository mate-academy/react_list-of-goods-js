import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

export const defSorting = {
  method: '',
  isReversed: false,
};

function preparedGoods(goods, { method, isReversed }) {
  const getGoods = [...goods];

  if (method === 'alphabet') {
    getGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (method === 'length') {
    getGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    getGoods.reverse();
  }

  return getGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(defSorting);
  const goods = preparedGoods(goodsFromServer, sortBy);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy({ ...sortBy, method: 'alphabet' })}
          className={
            classNames(
              'button',
              'is-info',
              {
                'is-light': sortBy.method !== 'alphabet',
              },
            )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy({ ...sortBy, method: 'length' })}
          className={
            classNames(
              'button',
              'is-success',
              {
                'is-light': sortBy.method !== 'length',
              },
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setSortBy(
            sortBy.isReversed
              ? { ...sortBy, isReversed: false }
              : { ...sortBy, isReversed: true },
          )}
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !sortBy.isReversed,
            },
          )}
        >
          Reverse
        </button>

        {(sortBy.method || sortBy.isReversed) && (
          <button
            type="button"
            onClick={() => setSortBy({
              method: '',
              isReversed: false,
            })}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
