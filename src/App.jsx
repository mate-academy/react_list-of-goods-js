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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortFiled, setSortFiled] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer].sort((a, b) => {
    if (sortFiled === SORT_BY_ALPHABET) {
      return a.localeCompare(b);
    }

    if (sortFiled === SORT_BY_LENGTH) {
      return a.length - b.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortFiled === SORT_BY_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortFiled(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortFiled === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortFiled(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortFiled || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFiled('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
