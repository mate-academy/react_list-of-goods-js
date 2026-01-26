import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classname';

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
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let goods = [...goodsFromServer];

  if (sortField) {
    goods.sort((goods1, goods2) => {
      switch (sortField) {
        case 'alphabet':
          return goods1.localeCompare(goods2);
        case 'length':
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={() => setSortField('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortField('');
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
