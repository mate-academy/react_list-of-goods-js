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
  const [reverse, setReverse] = useState(false);

  const sortGoods = sortBy => {
    setGoods(
      [...goods].sort((a, b) => {
        switch (sortBy) {
          case 'alphabet':
            setSortField(sortBy);

            return reverse ? b.localeCompare(a) : a.localeCompare(b);

          case 'length':
            setSortField(sortBy);

            return reverse ? b.length - a.length : a.length - b.length;

          default:
            return '';
        }
      }),
    );
  };

  const sortByReverse = () => {
    setGoods([...goods].reverse());
    setReverse(!reverse);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortField('');
    setReverse(false);
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
            'is-light': sortField !== 'alphabet',
          })}
          onClick={() => sortGoods('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse !== true,
          })}
          onClick={sortByReverse}
        >
          Reverse
        </button>

        {isGoodsModified() && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortField !== 'reset',
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
