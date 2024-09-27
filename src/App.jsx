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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';

function getPreparedGoods(goods, sortField, reversed) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortField === SORT_ALPHABETICALLY ? `is-info` : `is-light`}`}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        >
          {SORT_ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={`button ${sortField === SORT_BY_LENGTH ? `is-success` : `is-light`}`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={`button ${reversed ? `is-warning` : `is-light`}`}
          onClick={() => setReversed(!reversed)}
        >
          {REVERSE}
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          <></>
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
