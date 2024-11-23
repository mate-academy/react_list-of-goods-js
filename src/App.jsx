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

const nameSort = 'name';
const lengthSort = 'length';

const sortGoods = (goods, { sort, isReverse }) => {
  const sortGood = [...goods];

  if (sort) {
    sortGood.sort((good1, good2) => {
      switch (sort) {
        case nameSort: {
          return good1.localeCompare(good2);
        }

        case lengthSort: {
          return good1.length - good2.length;
        }

        default:
          return 0;
      }
    });
  }

  return isReverse ? sortGood.reverse() : sortGood;
};

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortField, setSortField] = useState(null);
  const showGoods = sortGoods(goodsFromServer, {
    isReverse,
    sort: sortField,
  });

  const RESET = () => {
    setSortField(null);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== nameSort,
          })}
          onClick={() => setSortField(nameSort)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== lengthSort,
          })}
          onClick={() => setSortField(lengthSort)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={RESET}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
