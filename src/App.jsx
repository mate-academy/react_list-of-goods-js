import { useState } from 'react';
import cl from 'classnames';
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

const SORT_BY_ALPHABET = 'alphabetical';
const SORT_BY_LENGTH = 'length';

function getSortedGoodsList(goods, parameter, reversed) {
  const sortedGoodList = [...goods];

  if (parameter) {
    sortedGoodList.sort((a, b) => {
      switch (parameter) {
        case SORT_BY_LENGTH: {
          return a.length - b.length;
        }

        case SORT_BY_ALPHABET: {
          return a.localeCompare(b);
        }

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedGoodList.reverse();
  }

  return sortedGoodList;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoodsList = getSortedGoodsList(
    goodsFromServer,
    sortType,
    isReversed,
  );
  const resetSortingOptions = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cl(
            'button',
            'is-info',
            { 'is-light': sortType !== SORT_BY_ALPHABET },
          )}
          onClick={() => setSortType(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl(
            'button',
            'is-success',
            { 'is-light': sortType !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cl(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== '' || isReversed !== false)
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetSortingOptions()}
          >
            Reset
          </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoodsList.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
