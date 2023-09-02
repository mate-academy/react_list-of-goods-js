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

function getSortedGoodsList(goods, { sortType, isReversed }) {
  const sortedGoodList = [...goods];

  if (sortType) {
    sortedGoodList.sort((a, b) => {
      switch (sortType) {
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

  if (isReversed) {
    sortedGoodList.reverse();
  }

  return sortedGoodList;
}

export const App = () => {
  const [sortingOptions, setSortingOptions] = useState({
    sortType: '',
    isReversed: false,
  });

  const visibleGoodsList = getSortedGoodsList(
    goodsFromServer,
    sortingOptions,
  );

  const handlerSetSortType = sortType => () => {
    setSortingOptions(prevState => ({
      ...prevState,
      sortType,
    }));
  };

  const handlerSetIsReversed = () => {
    setSortingOptions(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const resetSortingOptions = () => {
    setSortingOptions({
      sortType: '',
      isReversed: false,
    });
  };

  const isSortingOptionsInstalled = (
    sortingOptions.sortType || sortingOptions.isReversed
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cl(
            'button',
            'is-info',
            { 'is-light': sortingOptions.sortType !== SORT_BY_ALPHABET },
          )}
          onClick={handlerSetSortType(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl(
            'button',
            'is-success',
            { 'is-light': sortingOptions.sortType !== SORT_BY_LENGTH },
          )}
          onClick={handlerSetSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cl(
            'button',
            'is-warning',
            { 'is-light': !sortingOptions.isReversed },
          )}
          onClick={handlerSetIsReversed}
        >
          Reverse
        </button>

        {isSortingOptionsInstalled
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortingOptions}
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
