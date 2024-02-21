import { useState } from 'react';

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

const ALPHABET = 'alphabet';
const LENGTH = 'length';

export const App = () => {
  const [sort, setSort] = useState('');
  const [reverse, setReverse] = useState(false);

  const prepareGoods = () => {
    const copyGoods = [...goodsFromServer];

    if (sort === ALPHABET) {
      copyGoods.sort((a, b) => a.localeCompare(b));
    } else if (sort === LENGTH) {
      copyGoods.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      copyGoods.reverse();
    }

    return copyGoods;
  };

  const resetAll = () => {
    setSort('');
    setReverse(false);
  };

  const goodsList = prepareGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSort(ALPHABET)}
          type="button"
          className={`button is-info ${sort !== ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSort(LENGTH)}
          type="button"
          className={`button is-success ${sort !== LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
        >
          Reverse
        </button>

        {(sort || reverse) && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
