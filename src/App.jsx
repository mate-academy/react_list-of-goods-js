import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './Components/GoodList';

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const NAME_SORT_BY_ALPHABET = 'Sorted by alphabetical order';
const NAME_SORT_BY_LENGTH = 'Sorted by length';
const NAME_SORT_ENOUGH = 'Not sorted';

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

function updateCurrentGoods(goods, sortType, isReversed) {
  let visibleGoods = [...goods];

  const sortedGoods = visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return isReversed ? visibleGoods : sortedGoods;
}

function createSortText(sortType, isReversed) {
  let result;

  switch (sortType) {
    case SORT_BY_ALPHABET:
      result = NAME_SORT_BY_ALPHABET;
      break;
    case SORT_BY_LENGTH:
      result = NAME_SORT_BY_LENGTH;
      break;
    default:
      result = NAME_SORT_ENOUGH;
      break;
  }

  if (isReversed) {
    result += ' and the list is reversed';
  }

  return result;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const currentGoods = updateCurrentGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const isReset = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': sortType !== SORT_BY_ALPHABET },
            )
          }
          onClick={() => {
            setSortType(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': sortType !== SORT_BY_LENGTH },
            )
          }
          onClick={() => {
            setSortType(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-warning',
              { 'is-light': isReversed },
            )
          }
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {
          isReset && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <GoodList goods={currentGoods} />

      <h1>{createSortText(sortType, isReversed)}</h1>
    </div>
  );
};
