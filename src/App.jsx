import { useState } from 'react';
import cn from 'classnames';

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

const SORT_TYPE_LENG = 'leng';
const SORT_TYPE_ALPH = 'alph';

const updateGoods = (goods, { sortType, isReverse }) => {
  if (sortType === '' && !isReverse) {
    return goods;
  }

  const udatedGoods = [...goods];

  if (sortType === SORT_TYPE_LENG || sortType === SORT_TYPE_ALPH) {
    udatedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE_LENG:
          return good1.length - good2.length;
        case SORT_TYPE_ALPH:
          return good1.localeCompare(good2);
        default:
          throw new Error('Unbelievable error');
      }
    });
  }

  if (isReverse) {
    udatedGoods.reverse();
  }

  return udatedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const goods = updateGoods(goodsFromServer, { sortType, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': SORT_TYPE_ALPH !== sortType,
          })}
          onClick={() => setSortType(SORT_TYPE_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SORT_TYPE_LENG !== sortType,
          })}
          onClick={() => setSortType(SORT_TYPE_LENG)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortType || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
