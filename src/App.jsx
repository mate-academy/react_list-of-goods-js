import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { SORTED_BY, REVERS_STATUS } from './utils/constants';
import { getPreparedGoods } from './utils/getPreparedGoods';

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

export const App = () => {
  const [sortBy, setSortBy] = useState(SORTED_BY.DEFAULT);
  const [reverseStatus, setReverseStatus] = useState(
    REVERS_STATUS.NOT_REVERSED,
  );

  const sortedGoods = getPreparedGoods(goodsFromServer, sortBy, reverseStatus);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SORTED_BY.NAME)}
          type="button"
          className={`button is-info ${sortBy !== SORTED_BY.NAME ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortBy(SORTED_BY.LENGTH)}
          type="button"
          className={`button is-success ${sortBy !== SORTED_BY.LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>
        <button
          onClick={() =>
            reverseStatus === REVERS_STATUS.REVERSED
              ? setReverseStatus(REVERS_STATUS.NOT_REVERSED)
              : setReverseStatus(REVERS_STATUS.REVERSED)
          }
          type="button"
          className={`button is-warning ${reverseStatus !== REVERS_STATUS.REVERSED ? 'is-light' : ''}`}
        >
          Reverse
        </button>
        {(reverseStatus !== REVERS_STATUS.NOT_REVERSED ||
          sortBy !== SORTED_BY.DEFAULT) && (
          <button
            onClick={() => {
              setReverseStatus(REVERS_STATUS.NOT_REVERSED);
              setSortBy(SORTED_BY.DEFAULT);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
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
