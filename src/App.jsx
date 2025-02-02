import cn from 'classnames';
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

const SORT_ALPHABETICALLY = 'abc';
const SORT_BY_LENGTH = 'len';

const NOT_ACTIVE_CLASS = 'is-light';

function getPreparedGoods(goods, { sortOrder, isReversed }) {
  const preparedGoods = [...goods];

  if (sortOrder) {
    switch (sortOrder) {
      case SORT_ALPHABETICALLY:
        preparedGoods.sort((a, b) => {
          return a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase());
        });
        break;

      case SORT_BY_LENGTH:
        preparedGoods.sort((a, b) => {
          return a.length - b.length;
        });
        break;

      default:
        preparedGoods.sort(() => {
          return 0;
        });
        break;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortOrder,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            [NOT_ACTIVE_CLASS]: sortOrder !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortOrder(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            [NOT_ACTIVE_CLASS]: sortOrder !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortOrder(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            [NOT_ACTIVE_CLASS]: !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(isReversed || sortOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortOrder('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
