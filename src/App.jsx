import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_BY_NAME = 'alphabetic';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetic':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReversed });

  const toggleReverse = () => setIsReversed(prevReverse => !prevReverse);

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const setSortByName = () => setSortField(SORT_BY_NAME);

  const setSortByLength = () => setSortField(SORT_BY_LENGTH);

  const resetButton = (sortField || isReversed) && (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={reset}
    >
      Reset
    </button>
  );

  const handleClasses = property => ({
    'is-light': !sortField.includes(property),
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', handleClasses(SORT_BY_NAME))}
          onClick={setSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', handleClasses(SORT_BY_LENGTH))}
          onClick={setSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={toggleReverse}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {resetButton}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
