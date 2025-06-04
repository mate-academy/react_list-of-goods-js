import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from './components/GoodList/GoodList';

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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_RESET = 'reset';

function getPreparedGoods(goods, sort, isReversed) {
  let sortedGoods;

  switch (sort) {
    case SORT_FIELD_ALPHABETICALLY:
      sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      sortedGoods = [...goods].sort((a, b) => a.length - b.length);
      break;
    case SORT_FIELD_RESET:
      sortedGoods = [...goods];
      break;
    default:
      sortedGoods = [...goods];
  }

  if (isReversed) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD_RESET);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'button is-info': sortField === SORT_FIELD_ALPHABETICALLY },
            {
              'button is-info is-light':
                sortField !== SORT_FIELD_ALPHABETICALLY,
            },
          )}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'button is-success': sortField === SORT_FIELD_LENGTH },
            { 'button is-success is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            { 'button is-warning': isReversed },
            { 'button is-warning is-light': !isReversed },
          )}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELD_RESET || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT_FIELD_RESET);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
