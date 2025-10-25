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

const ALPHABETICALLY_SORT = 'alphabetically';
const LENGTH_SORT = 'length';

function getSortedGoods(goodsList, sortType, isReversed) {
  const sortedGoods = [...goodsList];

  switch (sortType) {
    case ALPHABETICALLY_SORT:
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case LENGTH_SORT:
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(ALPHABETICALLY_SORT)}
          className={`button is-info ${!sortType.includes(ALPHABETICALLY_SORT) ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(LENGTH_SORT)}
          className={`button is-success ${!sortType.includes(LENGTH_SORT) ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!isReversed)}
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={() => {
            setSortType('');
            setReversed(false);
          }}
          className={sortType || isReversed ? 'button is-danger is-light' : ''}
        >
          {(sortType || isReversed) && 'Reset'}
        </button>
      </div>

      <ul>
        {getSortedGoods(goodsFromServer, sortType, isReversed).map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
