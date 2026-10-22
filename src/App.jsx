import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const isOriginalOrder = goods => {
  return goods.every((good, index) => good === goodsFromServer[index]);
};

export const App = () => {
  const [sorted, setSorted] = useState('');
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sorted !== 'alphabetically',
          })}
          onClick={() => {
            const sortedGoods = [...goodsFromServer];

            sortedGoods.sort((a, b) => a.localeCompare(b));

            setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
            setSorted('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sorted !== 'by length',
          })}
          onClick={() => {
            const sortedGoods = [...goodsFromServer].sort(
              (a, b) => a.length - b.length,
            );

            setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
            setSorted('by length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setGoods([...goods].reverse());
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {!isOriginalOrder(goods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSorted('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
