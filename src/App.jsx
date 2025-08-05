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

const SORT_ALPHABETICALLY = 'alphabetical';
const SORT_BY_LENGTH = 'length';

function prepareSortedGoods(goods, { sortType, isReversed }) {
  const preparedGoods = [...goodsFromServer];

  if (sortType === SORT_ALPHABETICALLY) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortType === SORT_BY_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = prepareSortedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const isOriginalOrder = !sortType && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
