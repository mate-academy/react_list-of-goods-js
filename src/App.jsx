import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const originalGoods = goodsFromServer;
  const isOriginalOrder = goods.join() === goodsFromServer.join();

  const handleReverse = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const handleSortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    ); // eslint-disable-line

    setGoods(isReversed ? sorted.reverse() : sorted);
    setSortType('alphabetically');
  };

  const handleSortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(isReversed ? sorted.reverse() : sorted);
    setSortType('by length');
  };

  const handleReset = () => {
    setGoods(originalGoods);
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== 'alphabetically',
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== 'by length',
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

        {!isOriginalOrder && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
