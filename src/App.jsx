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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';

const sortGoods = (goods, field, isReversed) => {
  const sortedGoods = [...goods];

  switch (field) {
    case SORT_FIELD_ALPHABETICALLY:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_BY_LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, sortField, isReversed);
  const isResetVisible = isReversed || sortField;

  const isResetVisibleHandler = () => {
    setSortField('');
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn('button', {
            'is-info': sortField === SORT_FIELD_ALPHABETICALLY,
            'is-info is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={cn('button', {
            'is-success': sortField === SORT_FIELD_BY_LENGTH,
            'is-success is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_BY_LENGTH);
          }}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn('button', {
            'is-warning': isReversed,
            'is-warning is-light': !isReversed,
          })}
          onClick={toggleReverse}
          type="button"
        >
          Reverse
        </button>

        {isResetVisible && (
        <button
          onClick={isResetVisibleHandler}
          type="button"
          className={cn('button', 'is-danger is-light')}
        >
          Reset
        </button>
        )}

      </div>
      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
