import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';

import './App.scss';
import { DEFAULTT, LENGTH, NAME } from './components/Consts';

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
  const goods = goodsFromServer.map((good, index) => ({
    name: good,
    id: index,
  }));
  const [sortedGoods, setSortedGoods] = useState(goods);
  const [sortType, setSortType] = useState(DEFAULTT);
  const [reversed, setReversed] = useState(false);
  const toReverse = () => {
    const newReversed = !reversed;

    setReversed(newReversed);

    setSortedGoods(prev => [...prev].reverse());
  };

  const toSort = type => {
    setSortType(type);
    const sorted = [...goods].sort((a, b) => {
      switch (type) {
        case NAME:
          return a.name.localeCompare(b.name);
        case LENGTH:
          return a.name.length - b.name.length;
        default:
          return a.id - b.id;
      }
    });

    setSortedGoods(reversed ? sorted.reverse() : sorted);
  };

  const reset = () => {
    setSortedGoods(goods);
    setSortType(DEFAULTT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => toSort(NAME)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => toSort(LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => toReverse()}
          type="button"
          className={cn('button is-warning', {
            'is-light': reversed !== true,
          })}
        >
          Reverse
        </button>

        {(sortType !== null || reversed) && (
          <button
            onClick={reset}
            type="button"
            className={cn('button is-danger', {
              'is-light': sortType !== null,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
