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

function sortArray(goods, howSort, reverse) {
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

const SORT_NAME = 'name';
const SORT_LENGTH = 'lenght';

export const App = () => {
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = sortArray(goodsFromServer, sort, reverse);

  function resetAll() {
    setSort('');

    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === SORT_NAME ? null : 'is-light'}`}
          onClick={() => setSort(SORT_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort === SORT_LENGTH ? null : 'is-light'}`}
          onClick={() => setSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse === true ? null : 'is-light'}`}
          onClick={() => reverse === setIsReversed(value => !value)}
        >
          Reverse
        </button>

        {sort !== '' || reverse
          ? (
            <button
              type="button"
              className={`button is-danger ${sort !== '' || reverse ? null : 'is-light'}`}
              onClick={resetAll}
            >
              Reset
            </button>
          )
          : null
        }

      </div>

      <ul>
        {visibleGoods.map(word => (
          <li data-cy="Good" key={word}>{word}</li>
        ))}
      </ul>
    </div>
  );
};
