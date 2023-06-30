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

function prepareGoods(goods, sortRule) {
  const preperedGoods = [...goods];

  if (sortRule && sortRule.includes('reverse')) {
    const reversedArr = [...goods].sort(() => -1);

    reversedArr.sort((good1, good2) => {
      switch (sortRule) {
        case 'reverse':
          return 1;
        case 'alphabetic reverse':
          return good2.localeCompare(good1);
        case 'length reverse':
          return good1.includes(' ')
            ? -1
            : good2.length - good1.length;
        default:
          return 0;
      }
    });

    return reversedArr;
  }

  if (sortRule) {
    preperedGoods.sort((good1, good2) => {
      switch (sortRule) {
        case 'alphabetic':
          return good1.localeCompare(good2);
        case 'length':
          return good1.includes(' ')
            ? 1
            : good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = prepareGoods(goodsFromServer, sortField);

  const SORT_BY_NAME = 'alphabetic';
  const SORT_BY_LENGTH = 'length';
  const SORT_REVERSE = 'reverse';

  const toggleReverse = () => setSortField((prevState) => {
    if (prevState === '') {
      return SORT_REVERSE;
    }

    const haveReverse = prevState.includes('reverse');

    if (haveReverse && prevState.split(' ').length === 1) {
      return '';
    }

    return haveReverse
      ? prevState.split(' ')[0]
      : `${sortField} ${SORT_REVERSE}`;
  });

  const handleSort = sortParameter => setSortField(prevSort => (
    prevSort.includes(SORT_REVERSE)
      ? `${sortParameter} ${SORT_REVERSE}`
      : sortParameter));

  const resetButton = sortField && (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => setSortField('')}
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
          onClick={() => handleSort(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', handleClasses(SORT_BY_LENGTH))}
          onClick={() => handleSort(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => toggleReverse()}
          className={cn('button is-warning', handleClasses(SORT_REVERSE))}
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
