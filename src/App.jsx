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

const prepareGoods = (sortMethod, reverseList) => {
  const copyGoods = [...goodsFromServer];

  if (sortMethod) {
    copyGoods.sort((a, b) => {
      if (sortMethod === ALPHABET) {
        return a.localeCompare(b);
      }

      if (sortMethod === LENGTH) {
        return a.length - b.length;
      }

      return 0;
    });
  }

  if (reverseList) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [reverseList, setReverseList] = useState(false);

  const resetAll = () => {
    setSortMethod('');
    setReverseList(false);
  };

  const goodsList = prepareGoods(sortMethod, reverseList);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(ALPHABET)}
          type="button"
          className={`button is-info ${sortMethod !== ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(LENGTH)}
          type="button"
          className={`button is-success ${sortMethod !== LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseList(!reverseList)}
          type="button"
          className={`button is-warning ${!reverseList && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortMethod || reverseList) && (
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
