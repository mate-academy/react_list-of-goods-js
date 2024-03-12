import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

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

const sortGoodsBy = (sortField, reversed) => {
  const copyGoods = [...goodsFromServer];

  switch (sortField) {
    case SORT_ALPHABET:
      copyGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_LENGTH:
      copyGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reversed) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState(false);
  const [reversed, setReversed] = useState(false);

  const sortedGoods = sortGoodsBy(sortField, reversed);

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
