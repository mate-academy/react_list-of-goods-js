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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [originalGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null);

  const btnByReset = () => {
    setGoods(originalGoods);
    setSortType('Reset');
  };

  const btnByReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setSortType('Reverse');
  };

  const btnByLength = () => {
    setGoods(prevGoods => [...prevGoods].sort((a, b) => a.length - b.length));
    setSortType('length');
  };

  const btnByAlphabetically = () => {
    setGoods(prevGoods => [...prevGoods].sort((a, b) => a.localeCompare(b)));
    setSortType('alphabetically');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== 'alphabetically',
          })}
          onClick={btnByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={btnByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortType !== 'Reverse',
          })}
          onClick={btnByReverse}
        >
          Reverse
        </button>

        {sortType !== null && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortType !== 'Reset',
            })}
            onClick={btnByReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(el => (
          <li key={el} data-cy="Good">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
