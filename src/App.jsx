import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_BY_LENGTH = 'length';
const SORT_REVERSE = 'reverse';

const sortButtons = [
  {
    name: 'Sort alphabetically',
    type: SORT_FIELD_ALPHABETICALLY,
    style: 'is-info',
  },
  {
    name: 'Sort by length',
    type: SORT_FIELD_BY_LENGTH,
    style: 'is-success',
  },
  {
    name: 'Reverse',
    type: SORT_REVERSE,
    style: 'is-warning',
  },
];

function getPreparedGoods(goods, sortType, isReversed) {
  const preparedGoods = [...goods];

  if (sortType === SORT_FIELD_ALPHABETICALLY) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === SORT_FIELD_BY_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );

  const handleSort = (type) => {
    if (type === SORT_REVERSE) {
      setIsReversed(!isReversed);
    } else {
      setSortField(type);
    }
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {sortButtons.map(({ name, type, style }) => (
          <button
            key={type}
            type="button"
            className={cn('button', style, {
              'is-light': type === SORT_REVERSE
                ? !isReversed
                : type !== sortField,
            })}
            onClick={() => handleSort(type)}
          >
            {name}
          </button>
        ))}

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
