import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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
const SORT_GOODS_ALPHABETICALLY = 'Sort alphabetically';
const SORT_GOODS_BY_LENGTH = 'Sort by length';

function updateGoods(goods, sortBy, isReversed) {
  let prepearedGoods = [...goods];

  if (sortBy) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_GOODS_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_GOODS_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isGoodsReversed, setIsGoodsReversed] = useState(false);
  const finalGoods
    = updateGoods(goodsFromServer, sortBy, isGoodsReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SORT_GOODS_ALPHABETICALLY,
          })}
          onClick={() => setSortBy(SORT_GOODS_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SORT_GOODS_BY_LENGTH,
          })}
          onClick={() => setSortBy(SORT_GOODS_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isGoodsReversed,
          })}
          onClick={() => setIsGoodsReversed(!isGoodsReversed)}
        >
          Reverse
        </button>

        {(sortBy || isGoodsReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsGoodsReversed(false);
              setSortBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {finalGoods.map(good => (
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
