import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

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

function getSortedGoods(goods, sortBy, reverse) {
  const preparedGoods = [...goods];

  switch (sortBy) {
    case SORT_BY_NAME:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  return reverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(
    goodsFromServer, sortBy, isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SORT_BY_NAME ? 'is-light' : ''}`}
          onClick={() => {
            setSortBy(SORT_BY_NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SORT_BY_LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setSortBy(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy || isReversed)
          && (
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
