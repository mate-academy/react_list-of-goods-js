import 'bulma/css/bulma.css';
import './App.scss';
import classname from 'classnames';
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

const SORT_ALPHABETICALLY = 'abc';
const SORT_BY_LENGTH = 'length';
const SORT_DESC = 'desc';

const sortListAlphabetically = (goods, sortDirection) => {
  goods.sort((good1, good2) => good1.localeCompare(good2));
  if (sortDirection === SORT_DESC) {
    goods.reverse();
  }

  return goods;
};

const sortListByLength = (goods, sortDirection) => {
  goods.sort((good1, good2) => good1.length - good2.length);
  if (sortDirection === SORT_DESC) {
    goods.reverse();
  }

  return goods;
};

const getGoods = (sortType, sortDirection) => {
  if (!sortType && !sortDirection) {
    return goodsFromServer;
  }

  if (!sortType) {
    return [...goodsFromServer].reverse();
  }

  const goods = [...goodsFromServer];

  switch (sortType) {
    case SORT_ALPHABETICALLY:
      return sortListAlphabetically(goods, sortDirection);
    case SORT_BY_LENGTH:
      return sortListByLength(goods, sortDirection);
    default:
      if (sortDirection === SORT_DESC) {
        return goods.reverse();
      }

      return goods;
  }
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const goods = getGoods(sortType, sortDirection);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classname('button', 'is-info', {
            'is-light': sortType !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortType(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classname('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortType(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classname('button', 'is-warning', {
            'is-light': sortDirection !== SORT_DESC,
          })}
          onClick={() => {
            setSortDirection(sortDirection ? '' : SORT_DESC);
          }}
        >
          Reverse
        </button>

        {sortType || sortDirection ? (
          <button
            type="button"
            className={classname('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortType('');
              setSortDirection('');
            }}
          >
            Reset
          </button>
        ) : null}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
