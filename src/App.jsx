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
const SORT_MODES = {
  default: '',
  length: 'length',
  alphabetically: 'alphabetically',
};

function sortGoods(goods, { sortMode, isReversed }) {
  const copiedGoods = [...goods];

  switch (sortMode) {
    case SORT_MODES.alphabetically:
      copiedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_MODES.length:
      copiedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortMode, setSortMode] = useState(SORT_MODES.default);

  const preparedGoods = sortGoods(goodsFromServer, {
    isReversed,
    sortMode,
  });

  const resetSorting = () => {
    setSortMode(SORT_MODES.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortMode !== SORT_MODES.alphabetically,
          })}
          onClick={() => setSortMode(SORT_MODES.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortMode !== SORT_MODES.length,
          })}
          onClick={() => setSortMode(SORT_MODES.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevAreReversed => !prevAreReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortMode) && (
          <button
            onClick={resetSorting}
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
