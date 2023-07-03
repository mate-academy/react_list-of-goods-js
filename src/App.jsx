import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';
import { GoodList } from './components/GoodList';
import { SORT_TYPE } from './constants/sortTypes';

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

function getSortedGoods(goods, { sortType, isReversed }) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE.ALPHABET:
          return good1.localeCompare(good2);

        case SORT_TYPE.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [isReversed, setReversed] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer,
    { sortField, isReversed });
  const isShowResetButton = sortField || isReversed;

  const reverseGoods = () => {
    // eslint-disable-next-line
    setReversed(isReversed => !isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_TYPE.ALPHABET })}
          onClick={() => setsortField(SORT_TYPE.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_TYPE.LENGTH })}
          onClick={() => setsortField(SORT_TYPE.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        { isShowResetButton
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setsortField('');
                setReversed(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
