import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_KEY_ALP = 'alphabetically';
const SORT_KEY_LENGTH = 'length';

function getPreparedGoods(goods, sortKey, isReverse) {
  let preparedGoods;

  switch (sortKey) {
    case SORT_KEY_ALP:
      preparedGoods = goods.toSorted();
      break;

    case SORT_KEY_LENGTH:
      preparedGoods = goods.toSorted((a, b) => a.length - b.length);
      break;

    default:
      preparedGoods = goods;
      break;
  }

  if (isReverse) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortKey, setSortKey] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGood = getPreparedGoods(goodsFromServer, sortKey, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortKey(SORT_KEY_ALP)}
          className={cn('button', 'is-info', {
            'is-light': sortKey !== SORT_KEY_ALP,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortKey(SORT_KEY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortKey !== SORT_KEY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReverse(!isReverse)}
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>
        {(sortKey || isReverse) && (
          <button
            type="button"
            onClick={() => {
              setSortKey('');
              setIsReverse(false);
            }}
            className={cn('button', 'is-danger', {
              'is-light': !sortKey,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
