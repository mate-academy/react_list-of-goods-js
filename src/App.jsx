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

const goods = goodsFromServer.map((name, id) => ({ name, id }));
const goodsCopy = [...goods];

// CONSTANTS FOR SORTS //
const byAlphabet = 'byAlphabet';
const byLength = 'byLength';
// CONSTANTS FOR SORTS //

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsCopy);
  const [sortField, setSortField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortByAlphabet = () => {
    if (!isReversed) {
      setVisibleGoods(
        visibleGoods.sort((good1, good2) =>
          good1.name.localeCompare(good2.name),
        ),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) =>
          good2.name.localeCompare(good1.name),
        ),
      );
    }

    setSortField(byAlphabet);
  };

  const handleSortByLength = () => {
    if (!isReversed) {
      setVisibleGoods(
        visibleGoods.sort(
          (good1, good2) => good1.name.length - good2.name.length,
        ),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort(
          (good1, good2) => good2.name.length - good1.name.length,
        ),
      );
    }

    setSortField(byLength);
  };

  const handleReverse = () => {
    setVisibleGoods(visibleGoods.reverse());
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setVisibleGoods(goods);
    setSortField(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== byAlphabet,
          })}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== byLength,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortField !== null || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
