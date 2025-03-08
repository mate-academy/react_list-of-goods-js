import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_ABC = 'abc';
const SORT_BY_LENGTH = 'length';

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

function getItems(items, sortingFlag, isReverse) {
  const preparedItems = [...items];

  if (sortingFlag) {
    preparedItems.sort((item1, item2) => {
      switch (sortingFlag) {
        case SORT_ABC:
          return item1.localeCompare(item2);
        case SORT_BY_LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedItems.reverse();
  }

  return preparedItems;
}

export const App = () => {
  const [sortFlag, setSortFlag] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleItems = getItems(goodsFromServer, sortFlag, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFlag !== SORT_ABC,
          })}
          onClick={() => setSortFlag(SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortFlag !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortFlag(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {isReverse || sortFlag !== '' ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFlag('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleItems.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
