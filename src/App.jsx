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

export const App = () => {
  const SET_SORT_ALPHABET = 'alphabet';
  const SET_SORT_LENGTH = 'length';
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SET_SORT_ALPHABET:
        return good1.localeCompare(good2);
      case SET_SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SET_SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortField(SET_SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-info ${sortField === SET_SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SET_SORT_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
