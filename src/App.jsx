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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sorted, setSort] = useState('');
  const [reversed, setReverse] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sorted !== 'ALPHABET',
          })}
          onClick={() => {
            if (reversed) {
              setGoods([...goods].sort((b, a) => a.localeCompare(b)));
            } else {
              setGoods([...goods].sort((a, b) => a.localeCompare(b)));
            }

            setSort('ALPHABET');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sorted !== 'LENGTH',
          })}
          onClick={() => {
            if (reversed) {
              setGoods([...goods].sort((b, a) => a.length - b.length));
            } else {
              setGoods([...goods].sort((a, b) => a.length - b.length));
            }

            setSort('LENGTH');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setGoods([...goods].reverse());
            if (reversed === true) {
              setReverse(false);
              if (sorted === 'REVERSE') {
                setSort('');
              }
            } else {
              setReverse(true);
              if (!sorted) {
                setSort('REVERSE');
              }
            }
          }}
        >
          Reverse
        </button>

        {sorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSort('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(a => (
          <li data-cy="Good" key={a}>
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
};
