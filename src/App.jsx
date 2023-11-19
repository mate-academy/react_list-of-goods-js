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

const SORT_TYPE_NONE = '';
const SORT_TYPE_ABC = 'abc';
const SORT_TYPE_LENGTH = 'length';

function getPreparedGoods(goods, { sortType, isReverse }) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE_ABC:
          return good1.localeCompare(good2);

        case SORT_TYPE_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SORT_TYPE_NONE);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortType, isReverse },
  );

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const reset = () => {
    setSortType(SORT_TYPE_NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_TYPE_ABC)}
          type="button"
          className={cn(
            'button', 'is-info', {
              'is-light': sortType !== SORT_TYPE_ABC,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
          type="button"
          className={cn(
            'button', 'is-success', {
              'is-light': sortType !== SORT_TYPE_LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn(
            'button', 'is-warning', {
              'is-light': !isReverse,
            },
          )}
        >
          Reverse
        </button>

        {sortType && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li
            key={item}
            data-cy="Good"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
