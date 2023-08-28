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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABETICALLY = 'alphabetically';

function getPreperedGoods(goods, sortGoods, isReversedGoods) {
  const preperedGoods = [...goods];

  if (sortGoods) {
    preperedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        case SORT_BY_ALPHABETICALLY:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversedGoods) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversedGoods, setIsReversedGoods] = useState(false);
  const sortedGoods = getPreperedGoods(
    goodsFromServer,
    setSortField,
    isReversedGoods,
  );

  const isSortByLength = sortField !== SORT_BY_LENGTH;
  const isSortByName = sortField !== SORT_BY_ALPHABETICALLY;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': isSortByName },
          )}
          onClick={() => setSortField(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': isSortByLength },
          )}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversedGoods },
          )}
          onClick={() => setIsReversedGoods(!isReversedGoods)}
        >
          Reverse
        </button>
        {(sortField || isReversedGoods)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversedGoods(false);
                setSortField('');
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map(good => (
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
