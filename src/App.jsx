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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortfield, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortfield) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortfield !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortfield !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortfield !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
