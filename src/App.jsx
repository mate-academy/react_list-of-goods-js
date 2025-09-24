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

function getPreparedGoods(goods, query) {
  let preparedGoods = [...goods];

  if (query) {
    if (query.sort === 'alphabet') {
      preparedGoods = preparedGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
        // eslint-disable-next-line function-paren-newline
      );
    } else if (query.sort === 'length') {
      preparedGoods = preparedGoods.sort(
        (good1, good2) => good1.length - good2.length,
      );
    }

    if (query.reverse === true) {
      preparedGoods.reverse();
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortParams, setSortParams] = useState(null);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortParams);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortParams?.sort === 'alphabet'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortParams({ sort: 'alphabet', reverse: sortParams?.reverse });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortParams?.sort === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortParams({ sort: 'length', reverse: sortParams?.reverse });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            sortParams?.reverse === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => {
            setSortParams(prev => ({
              ...prev,
              reverse: !prev?.reverse,
            }));
          }}
        >
          Reverse
        </button>

        {(sortParams?.sort || sortParams?.reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortParams(null)}
          >
            Reset
          </button>
          // eslint-disable-next-line prettier/prettier, indent
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
