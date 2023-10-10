import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
// import { set } from 'cypress/types/lodash';

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

const SORT_GOODS_ABC = 'abc';
const SORT_GOODS_BY_LENGTH = 'length';

function getSortedGoods(goods, sortField, isReversed) {
  const sortedGoodsCopy = [...goods];

  if (sortField) {
    sortedGoodsCopy.sort((good1, good2) => {
      switch (sortField) {
        case SORT_GOODS_ABC:
          return good1.localeCompare(good2);

        case SORT_GOODS_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return sortedGoodsCopy;
      }
    });
  }

  if (isReversed) {
    sortedGoodsCopy.reverse();
  }

  return sortedGoodsCopy;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_GOODS_ABC },
          )}
          onClick={() => {
            setSortField(SORT_GOODS_ABC);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_GOODS_BY_LENGTH },
          )}
          onClick={() => {
            setSortField(SORT_GOODS_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
