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

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(null);
  const isModified =
    JSON.stringify(sortedGoods) !== JSON.stringify(goodsFromServer);

  const sortGoods = type => {
    const goods = [...goodsFromServer];

    if (type === 'alphabet') {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    setSortedGoods(goods);
    setSortType(type);
  };

  const reverseGoods = () => {
    setSortedGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortedGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== 'alphabet',
          })}
          onClick={() => sortGoods('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isModified && (
          <button type="button" className="button is-danger" onClick={reset}>
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
