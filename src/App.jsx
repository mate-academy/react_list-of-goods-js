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

function getPreparedGoods(goods, sortBy, REVERSED) {
  let preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      if (sortBy === SORT_BY_ALPHABET) {
        return good1.localeCompare(good2);
      }

      return good1.length - good2.length;
    });
  }

  if (REVERSED) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
          className={sortBy === SORT_BY_ALPHABET
            ? 'button is-info'
            : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_LENGTH)}
          className={sortBy === SORT_BY_LENGTH
            ? 'button is-info'
            : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'
          }
          onClick={() => (isReversed
            ? setIsReversed(false)
            : setIsReversed(true))}
        >
          Reverse
        </button>

        {sortBy || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortBy('');
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )
          : null
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={visibleGoods.lastIndexOf(good)}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
