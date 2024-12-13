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

const SORT_BY_ALPHABETICAL = 'alphabetical';
const SORT_BY_LENGHT = 'length';

export const App = () => {
  function sortGoods(goods, sortField, reverse) {
    const changedGoods = [...goods];

    if (sortField) {
      changedGoods.sort((good1, good2) => {
        switch (sortField) {
          case SORT_BY_ALPHABETICAL:
            return good1.localeCompare(good2);

          case SORT_BY_LENGHT:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (reverse) {
      return changedGoods.reverse();
    }

    return changedGoods;
  }

  const [sortMethod, setSortMethod] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortMethod, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortMethod === SORT_BY_ALPHABETICAL ? 'button is-info' : 'button is-info is-light'}`}
          onClick={() => setSortMethod(SORT_BY_ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortMethod === SORT_BY_LENGHT ? 'is-success' : 'is-light'}`}
          onClick={() => setSortMethod(SORT_BY_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReverse ? 'is-warning' : 'is-light'}`}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortMethod || isReverse) && (
          <button
            type="button"
            className={`button ${sortMethod === 'reset' ? 'is-danger' : 'is-light'}`}
            onClick={() => {
              setSortMethod('');
              setIsReverse(false);
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
