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

const ACTIVE_BUTTON_ABC = 'ABC';
const ACTIVE_BUTTON_LENGTH = 'length';

function getSortedGoods(goods, { activeSort, isReversed }) {
  const sortedGoods = [...goods];

  if (activeSort) {
    sortedGoods.sort((good1, good2) => {
      switch (activeSort) {
        case ACTIVE_BUTTON_ABC:
          return good1.localeCompare(good2);
        case ACTIVE_BUTTON_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortGoods = getSortedGoods(goodsFromServer, { activeSort, isReversed });
  const getResetButton = activeSort || isReversed;

  const reset = () => {
    setActiveSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': activeSort !== ACTIVE_BUTTON_ABC,
          })}
          onClick={() => setActiveSort(ACTIVE_BUTTON_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': activeSort !== ACTIVE_BUTTON_LENGTH,
          })}
          onClick={() => setActiveSort(ACTIVE_BUTTON_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {getResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
