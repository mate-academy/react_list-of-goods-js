import cn from 'classnames';

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

const SORT_TYPE_BY_ALPHABET = 'alphabet';
const SORT_TYPE_BY_LENGTH = 'length';

export const App = () => {
  const [currentSort, setCurrentSort] = useState('');
  const [isListReversed, setIsListReversed] = useState(false);

  const isResetBtnShowed = isListReversed || currentSort;

  const changeReverseList = () => {
    if (isListReversed) {
      setIsListReversed(false);

      return;
    }

    setIsListReversed(true);
  };

  const resetSorting = () => {
    setCurrentSort('');
    setIsListReversed(false);
  };

  const prepareGoodsToShow = (goodsList, sortType, reverse) => {
    let goodsToShow = [...goodsList];

    if (sortType) {
      goodsToShow = goodsToShow.sort(
        (good1, good2) => {
          switch (sortType || reverse) {
            case SORT_TYPE_BY_ALPHABET:
              return good1.localeCompare(good2);

            case SORT_TYPE_BY_LENGTH:
              return good1.length - good2.length;

            default:
              return 0;
          }
        },
      );
    }

    if (reverse) {
      goodsToShow.reverse();
    }

    return goodsToShow;
  };

  const goodsToShow = prepareGoodsToShow(
    goodsFromServer,
    currentSort,
    isListReversed,

  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              {
                'is-light': currentSort !== SORT_TYPE_BY_ALPHABET,
              },
            )
          }
          onClick={() => setCurrentSort(SORT_TYPE_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              {
                'is-light': currentSort !== SORT_TYPE_BY_LENGTH,
              },
            )
          }
          onClick={() => setCurrentSort(SORT_TYPE_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              {
                'is-light': !isListReversed,
              },
            )
          }
          onClick={changeReverseList}
        >
          Reverse
        </button>

        {isResetBtnShowed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {
          goodsToShow.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
