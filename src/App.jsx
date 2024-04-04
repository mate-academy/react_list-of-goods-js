import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [resetToggle, setResetToogle] = useState(false);

  let goods = [...goodsFromServer].sort((goods1, goods2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return goods1.localeCompare(goods2);
      case SORT_FIELD_LENGTH:
        return goods1.length - goods2.length;
      default:
        return 0;
    }
  });

  if (resetToggle) {
    goods = goods.reverse();
  }

  // reverse
  const reverse = () => {
    setResetToogle(!resetToggle);
  };

  // reset
  const reset = () => {
    setSortField('');
    setResetToogle('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-warning ${!resetToggle && 'is-light'}`}
        >
          Reverse
        </button>

        {sortField !== '' && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
