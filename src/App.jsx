import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_ALPHA = 'alphabetic';
const SORT_LENGTH = 'length';

const sort = (goods, sortField, reverse) => {
  const goodsList = [...goods];

  switch (sortField) {
    case SORT_ALPHA:
      goodsList.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_LENGTH:
      goodsList.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (reverse) {
    return goodsList.reverse();
  }

  return goodsList;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [activeReverse, setActiveReverse] = useState(false);
  const goodsList = sort(goodsFromServer, sortField, activeReverse);

  const reset = () => {
    setSortField('');
    setActiveReverse(false)
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_ALPHA)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPHA,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setActiveReverse(!activeReverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !activeReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || activeReverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
