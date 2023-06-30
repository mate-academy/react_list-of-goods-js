import React, { useState } from 'react';
import cn from 'classnames';
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

const ORDER_TYPE = {
  NONE: 'none',
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

export function getReorderedGoods(goods, { sortType, isReversed }) {
  const visibleGoods = [...goods];

  if (sortType) {
    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case ORDER_TYPE.ALPHABET:
          return good1.localeCompare(good2);

        case ORDER_TYPE.LENGTH:
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
  const { NONE, ALPHABET, LENGTH } = ORDER_TYPE;
  const [sortType, setSortType] = useState(NONE);
  const [isReversed, setIsReversed] = useState(false);
  const realGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const isSorted = sortType === ALPHABET || sortType === LENGTH || isReversed;

  const handleReset = () => {
    setSortType(NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== ALPHABET,
          })}
          onClick={() => setSortType(ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== LENGTH,
          })}
          onClick={() => setSortType(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={realGoods} />
    </div>
  );
};
