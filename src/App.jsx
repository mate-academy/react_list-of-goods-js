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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';

const sortGoods = (goods, field, isReversed) => {
  const sortedGoods = [...goods];

  switch (field) {
    case SORT_FIELD_ALPHABETICALLY:
      sortedGoods.sort();
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
  const showResetButton = isReversed || sortField;

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={sortField === SORT_FIELD_ALPHABETICALLY
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={sortField === SORT_FIELD_BY_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => {
            setSortField(SORT_FIELD_BY_LENGTH);
          }}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={toggleReverse}
          type="button"
        >
          Reverse
        </button>

        {showResetButton && (
        <button
          onClick={() => {
            setSortField('');
            setIsReversed(false);
          }}
          type="button"
          className="button is-danger is-light"
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
