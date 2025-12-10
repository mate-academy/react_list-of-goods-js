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

export const App = () => {
  const [order, setOrder] = useState('');
  const [isReverse, setReverse] = useState(false);
  const sortedList = [...goodsFromServer];

  switch (order) {
    case 'alphabetical':
      sortedList.sort((a, b) => {
        return a.localeCompare(b);
      });
      break;
    case 'byLength':
      sortedList.sort((a, b) => {
        return a.length - b.length;
      });
      break;
    default:
      break;
  }

  if (isReverse) {
    sortedList.reverse();
  }

  const resetOrder = () => {
    setOrder('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            order === 'alphabetical'
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setOrder('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            order === 'byLength'
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setOrder('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {(order !== '' || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetOrder()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
