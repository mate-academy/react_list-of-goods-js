import 'bulma/css/bulma.css';
import './App.scss';
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
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState(null);
  const isOriginal = JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  const sortAlphabetically = () => {
    setGoods([...goods].sort());
    setActiveSort('alphabet');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setActiveSort('length');
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setActiveSort('reverse');
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setActiveSort(null);
  };

  const getButtonClass = type =>
    `button is-${
      {
        alphabet: 'info',
        length: 'success',
        reverse: 'warning',
        reset: 'danger',
      }[type]
    } ${activeSort === type ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('alphabet')}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('length')}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            type="button"
            className={getButtonClass('reset')}
            onClick={resetGoods}
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
