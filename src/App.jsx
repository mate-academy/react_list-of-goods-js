import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const SORT_ALPHABETICALLY_ID = 'alphabetically';
const SORT_LENGTH_ID = 'by_length';
const SORT_REVERSE_ID = 'reverse';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const handleSortClick = newSortField => {
    if (newSortField === SORT_REVERSE_ID) {
      setIsReverse(!isReverse);
    } else {
      setSortField(newSortField);
    }
  };

  const getPreparedGoods = (goods, currentField) => {
    let preparedGoods = [...goods];

    if (currentField === SORT_ALPHABETICALLY_ID) {
      preparedGoods = preparedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (currentField === SORT_LENGTH_ID) {
      preparedGoods = preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReverse) {
      preparedGoods = preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const preparedGoods = getPreparedGoods(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSortClick(SORT_ALPHABETICALLY_ID)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY_ID,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSortClick(SORT_LENGTH_ID)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_LENGTH_ID,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleSortClick(SORT_REVERSE_ID)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField !== SORT_REVERSE_ID && !isReverse,
          })}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
