import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
  const SORT_ALPHABETIC_KEY = 'alphabetic';
  const SORT_LENGTH_KEY = 'length';
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');

  const sorters = {
    [SORT_ALPHABETIC_KEY]: (a, b) => a.localeCompare(b),
    [SORT_LENGTH_KEY]: (a, b) => a.length - b.length,
  };

  const reset = () => {
    setReversed(false);
    setSortField('');
  };

  const getVisibleGoods = () => {
    let goods = [...goodsFromServer];

    if (sortField) {
      goods = goods.toSorted(sorters[sortField]);
    }

    if (reversed) {
      goods = goods.toReversed();
    }

    return goods;
  };

  const showReset = reversed || sortField;

  const visibleGoods = getVisibleGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPHABETIC_KEY,
          })}
          onClick={() => setSortField(SORT_ALPHABETIC_KEY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_LENGTH_KEY,
          })}
          onClick={() => setSortField(SORT_LENGTH_KEY)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
