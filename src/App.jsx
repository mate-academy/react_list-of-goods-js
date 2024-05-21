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
  const [sortField, setSortField] = useState('');

  const sortByAlphabet = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
    setSortField('light');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setSortField('length');
  };

  const sortByReverse = () => {
    setGoods([...goods].reverse());
    setSortField('reverse');
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortField('');
  };

  const isGoodsModified = () => {
    return JSON.stringify(goods) !== JSON.stringify(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'light',
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortField !== 'reverse',
          })}
          onClick={sortByReverse}
        >
          Reverse
        </button>
        {isGoodsModified() && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortField !== 'reverse',
            })}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
