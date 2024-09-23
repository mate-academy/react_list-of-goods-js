import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);

  const sortGoods = order => {
    let sortedGoods;

    switch (order) {
      case 'alphabet':
        sortedGoods = [...goodsFromServer].sort();
        break;
      case 'length':
        sortedGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    if (isReversed) sortedGoods.reverse();
    setGoods(sortedGoods);
    setSortOrder(order);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortOrder(null);
    setIsReversed(false);
  };

  const isResetVisible =
    JSON.stringify(goods) !== JSON.stringify(goodsFromServer);
  const visibleGoods = goods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortOrder !== 'alphabet',
          })}
          onClick={() => sortGoods('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortOrder !== 'length',
          })}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
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
