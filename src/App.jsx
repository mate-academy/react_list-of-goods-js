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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const goodsWithId = getGoodsWithId(goodsFromServer);

function getGoodsWithId(goods) {
  return goods.map((product, index) => ({ product, id: index + 1 }));
}

function getSortCallback(sortField) {
  return (goodA, goodB) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return goodA.product.localeCompare(goodB.product);

      case SORT_FIELD_LENGTH:
        return goodA.product.length - goodB.product.length;

      default:
        return 0;
    }
  };
}

function getSortedGoods(goods, sortField, isReversed) {
  const goodsCopy = [...goods];

  goodsCopy.sort(getSortCallback(sortField));

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsWithId, sortField, isReversed);

  const isChanged = () => Boolean(sortField) || isReversed;
  const resetFilterOptions = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': SORT_FIELD_ALPHABET !== sortField,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SORT_FIELD_LENGTH !== sortField,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
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

        {isChanged() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilterOptions}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(({ product, id }) => (
          <li data-cy="Good" key={id}>{product}</li>
        ))

        }
      </ul>
    </div>
  );
};
