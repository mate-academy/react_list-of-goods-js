import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ALPHABBET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

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

function getSortedGoods(goods, sortField, isReversed) {
  const sortedGoods = [...goods];

  sortedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABBET:
        return good1.localeCompare(good2);

      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  const handleSort = field => {
    setSortField(field);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SORT_FIELD_ALPHABBET)}
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABBET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
