import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

const GOODS_SORT = {
  RESET: 0,
  ORIGINAL: 1,
  REVERSE: 2,
  ALPHABETICALLY: 3,
  BY_LENGTH: 4,
};

const getSortedGoods = (goods, sortingState, order) => {
  let result;

  switch (sortingState) {
    case GOODS_SORT.ALPHABETICALLY:
      result = [...goods].sort((good1, good2) => good1.localeCompare(good2));
      break;

    case GOODS_SORT.BY_LENGTH:
      result = [...goods].sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      result = [...goods];
  }

  return order === GOODS_SORT.REVERSE ? result.reverse() : result;
};

export const App = () => {
  const [sortingState, setSortingState] = useState(GOODS_SORT.RESET);
  const [order, setOrder] = useState(GOODS_SORT.ORIGINAL);
  const goods = getSortedGoods(goodsFromServer, sortingState, order);

  const lightButtonClass = buttonType =>
    buttonType !== sortingState ? 'is-light' : '';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${lightButtonClass(GOODS_SORT.ALPHABETICALLY)}`}
          onClick={() => {
            setSortingState(GOODS_SORT.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${lightButtonClass(GOODS_SORT.BY_LENGTH)}`}
          onClick={() => setSortingState(GOODS_SORT.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${order !== GOODS_SORT.REVERSE ? 'is-light' : ''}`}
          onClick={() =>
            order === GOODS_SORT.ORIGINAL
              ? setOrder(GOODS_SORT.REVERSE)
              : setOrder(GOODS_SORT.ORIGINAL)
          }
        >
          Reverse
        </button>

        {sortingState !== GOODS_SORT.RESET || order === GOODS_SORT.REVERSE ? (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortingState(GOODS_SORT.RESET);
              setOrder(GOODS_SORT.ORIGINAL);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
