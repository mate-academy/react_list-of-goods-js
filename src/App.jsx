import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './GoodList';

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

const NONE = 'none';
const ALPHABET = 'alphabet';
const LENGTH = 'length';

export function getReorderedGoods(goods, { sortType, isReversed }) {
  const visibleGoods = [...goods];

  if (sortType) {
    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case ALPHABET:
          return good1.localeCompare(good2);

        case LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(NONE);
  const [isReversed, setIsReversed] = useState(false);
  const realGoods
  = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const isSorted = sortType === ALPHABET || sortType === LENGTH || isReversed;

  const reset = () => {
    setSortType(NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== ALPHABET ? 'is-light' : ''}`}
          onClick={() => setSortType(ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortType(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={realGoods} />
    </div>
  );
};
