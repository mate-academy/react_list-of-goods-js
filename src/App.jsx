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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  let goods = [...goodsFromServer];

  if (sortField) {
    goods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    goods = goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
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
