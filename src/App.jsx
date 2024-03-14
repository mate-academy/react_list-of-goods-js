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

const SORT_TYPE_NAME = 'name';
const SORT_TYPE_LENGTH = 'length';

function prepareGoods(goodsList, sortType, isReversed) {
  const preparedGoods = [...goodsFromServer];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE_NAME:
          return good1.localeCompare(good2);
        case SORT_TYPE_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(undefined);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = prepareGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_TYPE_NAME,
          })}
          onClick={() => setSortType(SORT_TYPE_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
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
