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

const Good = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);

export const App = () => {
  const [sortMode, setSortMode] = useState(null); // 'alphabetical' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);

  // derive displayed goods from goodsFromServer, sortMode, and isReversed
  const displayedGoods = (() => {
    const goods = [...goodsFromServer];

    if (sortMode === 'alphabetical') {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (sortMode === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  })();

  const sortAlphabetically = () => {
    setSortMode('alphabetical');
  };

  const sortByLength = () => {
    setSortMode('length');
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortMode(null);
    setIsReversed(false);
  };

  // check if displayedGoods differs from original order
  const isResetVisible = displayedGoods.some(
    (good, index) => good !== goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortMode !== 'alphabetical',
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortMode !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': !isReversed })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <Good goods={displayedGoods} />
    </div>
  );
};
