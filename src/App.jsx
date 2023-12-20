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

const SORT_BUTTON_ALPH = 'alphabetically';
const SORT_BUTTON_LENGTH = 'byLength';

function getPreparedGoods(goods, { sortButton, isReversed }) {
  const preparedGoods = [...goods];

  if (sortButton) {
    preparedGoods.sort((good1, good2) => {
      switch (sortButton) {
        case SORT_BUTTON_ALPH:
          return good1.localeCompare(good2);

        case SORT_BUTTON_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortButton, setSortButton] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getPreparedGoods(goodsFromServer, {
    sortButton,
    isReversed,
  });

  const getReversedGoods = () => (
    !isReversed
      ? setIsReversed(true)
      : setIsReversed(false)
  );

  const getReset = () => {
    setSortButton('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortButton(SORT_BUTTON_ALPH)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortButton !== SORT_BUTTON_ALPH,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortButton(SORT_BUTTON_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortButton !== SORT_BUTTON_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={getReversedGoods}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortButton || isReversed) && (
          <button
            onClick={getReset}
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
