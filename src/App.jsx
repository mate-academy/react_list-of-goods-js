import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_TYPE = {
  NONE: '',
  ABC: 'ABC',
  LENGTH: 'LENGTH',
};

const getPreparedGoods = (goods, { sortType, isReverse }) => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE.ABC:
          return good1.localeCompare(good2);

        case SORT_TYPE.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(SORT_TYPE.NONE);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortType, isReverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            {
              'is-light': sortType !== SORT_TYPE.ABC,
            })}
          onClick={() => setSortType(SORT_TYPE.ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            {
              'is-light': sortType !== SORT_TYPE.LENGTH,
            })}
          onClick={() => setSortType(SORT_TYPE.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            {
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
              setSortType(SORT_TYPE.NONE);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
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
