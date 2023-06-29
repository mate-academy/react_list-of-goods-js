import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { List } from './Components/List';

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

const SORT_BY_ALPHA = 'asc';
const SORT_BY_LENGTH = 'up';

function sortingFunction(goods, sortBy, isReverse) {
  const list = [...goods];

  list.sort((a, b) => {
    switch (sortBy) {
      case SORT_BY_ALPHA:
        return a.localeCompare(b);
      case SORT_BY_LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    list.reverse();
  }

  return list;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');

  const [isReverse, setReverse] = useState(false);

  const changedGoods = sortingFunction(
    goodsFromServer, sortBy, isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortBy !== SORT_BY_ALPHA },
          )
          }
          onClick={() => (setSortBy(SORT_BY_ALPHA))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortBy !== SORT_BY_LENGTH },
          )
          }
          onClick={() => (setSortBy(SORT_BY_LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => (setReverse(prev => (!prev)))}
        >
          Reverse
        </button>
        {(sortBy !== '' || isReverse) && (
        <button
          type="button"
          className="button is-danger"
          onClick={() => {
            setSortBy('');
            setReverse(false);
          }}
        >
          Reset
        </button>
        )}
      </div>
      <List
        goods={changedGoods}
      />
    </div>
  );
};
