import { useState } from 'react';
import cn from 'classnames';

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

const SORT_ALPHABETICALLY = 'letter';
const SORT_BY_LENGTH = 'length';

const sortingBy = (goods, property) => {
  const sortedGoods = [...goods];

  switch (property) {
    case SORT_ALPHABETICALLY:
      sortedGoods.sort((item1, item2) => item1.localeCompare(item2));
      break;
    case SORT_BY_LENGTH:
      sortedGoods.sort((item1, item2) => item1.length - item2.length);
      break;
    default:
      return 0;
  }

  return sortedGoods;
};

export const App = () => {
  const [sortingProperties, setSortingProperty] = useState(null);
  const [reverseSorting, setReverseSorting] = useState(false);
  let goods = [...goodsFromServer];

  if (sortingProperties) {
    goods = sortingBy(goods, sortingProperties);
  }

  if (reverseSorting) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortingProperties !== SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortingProperty(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortingProperties !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortingProperty(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseSorting !== true,
          })}
          onClick={() => setReverseSorting(!reverseSorting)}
        >
          Reverse
        </button>

        {(sortingProperties || reverseSorting) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortingProperty(null);
              setReverseSorting(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
