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

function getSortedGoods(goods, sortByName, sortByLength, reverse) {
  const preparedGoods = [...goods];

  if (sortByName) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortByLength) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  return reverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortByName, setSortByName] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getSortedGoods(
    goodsFromServer, sortByName, sortByLength, reverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!sortByName ? 'is-light' : ''}`}
          onClick={() => {
            setSortByName(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!sortByLength ? 'is-light' : ''}`}
          onClick={() => {
            setSortByLength(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse ? 'is-light' : ''}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortByName || sortByLength || reverse)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortByName(false);
                setSortByLength(false);
                setReverse(false);
              }}
            >
              Reset
            </button>
          )
          }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
