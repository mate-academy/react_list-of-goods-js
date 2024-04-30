import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';
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

const sortGoods = (goods, sortCondition) => {
  switch (sortCondition) {
    case 'alphabet':
      return goods.slice().sort((a, b) => a.localeCompare(b));
    case 'length':
      return goods.slice().sort((a, b) => a.length - b.length);
    default:
      return goods;
  }
};

export const App = () => {
  const [sortCondition, setSortCondition] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  useEffect(() => {
    let sortedGoods = sortGoods(goodsFromServer, sortCondition);

    if (isReversed) {
      sortedGoods = sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  }, [sortCondition, isReversed]);

  const handleReset = () => {
    setVisibleGoods(goodsFromServer);
    setSortCondition('');
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortCondition !== 'alphabet',
          })}
          onClick={() => setSortCondition('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortCondition !== 'length',
          })}
          onClick={() => setSortCondition('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortCondition || isReversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
