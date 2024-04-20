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

const NOT_SORTED = '';
const SORTED_BY_NAME = 'name';
const SORTED_BY_LENGTH = 'length';
const REVERSED = 'reversed';
const NOT_REVERSED = 'not reversed';

function getPreparedGoods(goodsFrom, sort, revStatus) {
  const goods = [...goodsFrom];

  if (sort) {
    goods.sort((good1, good2) => {
      switch (sort) {
        case SORTED_BY_NAME:
          return good1.localeCompare(good2);

        case SORTED_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (revStatus === REVERSED) {
    return goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(NOT_SORTED);
  const [reverseStatus, setReverseStatus] = useState(NOT_REVERSED);

  const sortedGoods = getPreparedGoods(goodsFromServer, sortBy, reverseStatus);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SORTED_BY_NAME)}
          type="button"
          className={`button is-info ${sortBy !== SORTED_BY_NAME ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortBy(SORTED_BY_LENGTH)}
          type="button"
          className={`button is-success ${sortBy !== SORTED_BY_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>
        <button
          onClick={() =>
            reverseStatus === REVERSED
              ? setReverseStatus(NOT_REVERSED)
              : setReverseStatus(REVERSED)
          }
          type="button"
          className={`button is-warning ${reverseStatus !== REVERSED ? 'is-light' : ''}`}
        >
          Reverse
        </button>
        {reverseStatus !== NOT_REVERSED || sortBy !== NOT_SORTED ? (
          <button
            onClick={() => {
              setReverseStatus(NOT_REVERSED);
              setSortBy(NOT_SORTED);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
