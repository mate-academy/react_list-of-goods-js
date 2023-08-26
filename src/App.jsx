import React, { useState } from 'react';
import cn from 'classnames';

import { GoodList } from './components/GoodsList/GoodsList';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPrepareGoods(goods, sortType, isReverse ) {
  const prepareGoods = [...goods];  

  if (sortType) {
    prepareGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods
    = getPrepareGoods(goodsFromServer, sortType, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SORT_FIELD_ALPHABET)}
          className={cn(
            'button is-info', { 'is-light': sortType !== SORT_FIELD_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SORT_FIELD_LENGTH)}
          className={cn(
            'button is-success', { 'is-light': sortType !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReverse(!isReverse)}
          className={cn(
            'button is-warning', { 'is-light': isReverse === false },
          )}
        >
          Reverse
        </button>

        {(sortType || isReverse) && (
          <button
            type="button"
            onClick={() => {
              setSortType('');
              setIsReverse(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
