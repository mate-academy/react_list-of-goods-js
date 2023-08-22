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

function updateGoods(goods, ligthedButton, isReversed) {
  let prepearedGoods = [...goods];

  if (ligthedButton) {
    prepearedGoods.sort((good1, good2) => {
      switch (ligthedButton) {
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
  const [ligthedButton, setLightedButton] = useState('');
  const [isGoodsreversed, setIsGoodsreversed] = useState(false);
  const finalGoods
    = updateGoods(goodsFromServer, ligthedButton, isGoodsreversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': ligthedButton !== SORT_GOODS_ALPHABETICALLY,
          })}
          onClick={() => setLightedButton(SORT_GOODS_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': ligthedButton !== SORT_GOODS_BY_LENGTH,
          })}
          onClick={() => setLightedButton(SORT_GOODS_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isGoodsreversed,
          })}
          onClick={() => setIsGoodsreversed(!isGoodsreversed)}
        >
          Reverse
        </button>

        {(ligthedButton || isGoodsreversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsGoodsreversed(false);
              setLightedButton('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {finalGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
