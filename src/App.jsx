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

function sort(goods, howSort, reverse) {
  const array = [...goods];

  array.sort((value1, value2) => {
    if (howSort === SORT_NAME) {
      return value1.localeCompare(value2);
    }

    if (howSort === SORT_LENGTH) {
      return value1.length - value2.length;
    }

    return 0;
  });

  if (reverse) {
    array.reverse();
  }

  return array;
}

function abc(boolean) {
  if (boolean === true) {
    return false;
  }

  return true;
}

const SORT_NAME = 'name';
const SORT_LENGTH = 'lenght';

export const App = () => {
  const [actual, setSort] = useState('');
  const [boolean, setBoolean] = useState(false);
  const arraySort = sort(goodsFromServer, actual, boolean);

  function aaaaa() {
    setSort('');

    setBoolean(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${actual === SORT_NAME ? null : 'is-light'}`}
          onClick={() => setSort(SORT_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${actual === SORT_LENGTH ? null : 'is-light'}`}
          onClick={() => setSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${boolean === true ? null : 'is-light'}`}
          onClick={() => boolean === setBoolean(abc(boolean))}
        >
          Reverse
        </button>

        {actual !== '' || boolean
          ? (
            <button
              type="button"
              className={`button is-danger ${actual !== '' || boolean ? null : 'is-light'}`}
              onClick={() => aaaaa()}
            >
              Reset
            </button>
          )
          : null
        }

      </div>

      <ul>
        {arraySort.map(word => (
          <li data-cy="Good">{word}</li>
        ))}
      </ul>
    </div>
  );
};
