import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

import { GoodList } from './components/GoodList';

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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function sortedBy(goods, value, isReversed) {
  const result = [...goods];

  switch (value) {
    case SORT_BY_NAME:
      result.sort((one, two) => one.localeCompare(two));
      break;

    case SORT_BY_LENGTH:
      result.sort((one, two) => one.length - two.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = sortedBy(goodsFromServer, sortValue, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortValue(SORT_BY_NAME);
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': SORT_BY_NAME === sortValue,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortValue(SORT_BY_LENGTH);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': SORT_BY_LENGTH === sortValue,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed,
          })}
        >
          Reverse
        </button>

        {(sortValue !== '' || isReversed) && (
          <button
            onClick={() => {
              setSortValue('');
            }}
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': sortValue === '' && !isReversed,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
