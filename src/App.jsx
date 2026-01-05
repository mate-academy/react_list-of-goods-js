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

const SORT_FIELD_ALPHABETIC = 'alphabetic';
const SORT_FIELD_LENGTH = 'length';

function getProcessedGoods(goods, { sortField, isReversed }) {
  let processedGoods = [...goods];

  if (sortField) {
    processedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETIC:
          return a.localeCompare(b);

        case SORT_FIELD_LENGTH:
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return processedGoods.reverse();
  }

  return processedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods = getProcessedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            onClick={() => setSortField(SORT_FIELD_ALPHABETIC)}
            type="button"
            className={cn('button', 'is-info', {
              'is-light': SORT_FIELD_ALPHABETIC !== sortField,
            })}
          >
            Sort alphabetically
          </button>

          <button
            onClick={() => setSortField(SORT_FIELD_LENGTH)}
            type="button"
            className={cn('button', 'is-success', {
              'is-light': SORT_FIELD_LENGTH !== sortField,
            })}
          >
            Sort by length
          </button>

          <button
            onClick={() => setIsReversed(!isReversed)}
            type="button"
            className={cn('button', 'is-warning', {
              'is-light': !isReversed,
            })}
          >
            Reverse
          </button>

          {(sortField || isReversed) && (
            <button
              onClick={handleReset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {displayedGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
