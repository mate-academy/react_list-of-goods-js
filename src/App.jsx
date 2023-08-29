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

const ALPHABET_SORT_KEY = 'alphabet';
const LENGTH_SORT_KEY = 'length';
const DEFAULT_SORT_KEY = '';

function getGoodsToRender(goods, sortKey, isReversed) {
  const preparedGoods = [...goods];

  if (sortKey) {
    switch (sortKey) {
      case ALPHABET_SORT_KEY:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case LENGTH_SORT_KEY:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortKey, setSortKey] = useState(DEFAULT_SORT_KEY);
  const [isReversed, setIsReversed] = useState(false);
  const isAppliedSort = isReversed || sortKey;
  const renderedGoods = getGoodsToRender(goodsFromServer, sortKey, isReversed);
  const onClickReset = () => {
    setSortKey(DEFAULT_SORT_KEY);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortKey !== ALPHABET_SORT_KEY,
          })}
          onClick={() => setSortKey(ALPHABET_SORT_KEY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortKey !== LENGTH_SORT_KEY,
          })}
          onClick={() => setSortKey(LENGTH_SORT_KEY)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(isReversedPrev => !isReversedPrev)}
        >
          Reverse
        </button>

        {!!isAppliedSort && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={onClickReset}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {renderedGoods.map(good => (
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
