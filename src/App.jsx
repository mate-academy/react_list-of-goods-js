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

const SORT_FIELD_ABC = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_RESET = 'Reset';
const SORT_FIELD_REVERSE = 'Reverse';

const sortGoods = (goods, currentSort, isReversed) => {
  let sortedGoods = [...goods];

  switch (currentSort) {
    case SORT_FIELD_ABC:
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_FIELD_LENGTH:
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case SORT_FIELD_RESET:
      sortedGoods = [...goodsFromServer];
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
  const [currentSort, setCurrentSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const isReset = currentSort || isReversed;

  const handleReset = () => {
    setCurrentSort('');
    setIsReversed(false);
  };

  const sortedGoods = sortGoods(goodsFromServer, currentSort, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-light': currentSort !== SORT_FIELD_ABC,
            'is-info': currentSort === SORT_FIELD_ABC,
          })}
          onClick={() => setCurrentSort(SORT_FIELD_ABC)}
        >
          {SORT_FIELD_ABC}
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-light': currentSort !== SORT_FIELD_LENGTH,
            'is-success': currentSort === SORT_FIELD_LENGTH,
          })}
          onClick={() => setCurrentSort(SORT_FIELD_LENGTH)}
        >
          {SORT_FIELD_LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-light': !isReversed,
            'is-warning': isReversed,
          })}
          onClick={() => setIsReversed(prevState => !prevState)}
        >
          {SORT_FIELD_REVERSE}
        </button>

        {isReset && (
          <button
            type="button"
            className={cn('button', {
              'is-light': currentSort !== SORT_FIELD_RESET,
              'is-danger': currentSort === SORT_FIELD_RESET,
            })}
            onClick={() => handleReset()}
          >
            {SORT_FIELD_RESET}
          </button>
        )}
      </div>

      {sortedGoods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </div>
  );
};
