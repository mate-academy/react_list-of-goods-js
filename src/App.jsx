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

const SORT = {
  undefined: list => [...list],
  ALPHABETICALLY: list => list.toSorted((el1, el2) => el1.localeCompare(el2)),
  BY_LENGTH: list => list.toSorted((el1, el2) => el1.length - el2.length),
};

const SORTING_TYPE = {
  undefined,
  ALPHABETICALLY: 'ALPHABETICALLY',
  BY_LENGTH: 'BY_LENGTH',
};

export const App = () => {
  const [sorting, setSorting] = useState({
    type: SORTING_TYPE.undefined,
    isReversed: false,
  });

  const sortedGoods = (() => {
    const arr = SORT[sorting.type](goodsFromServer);

    if (sorting.isReversed) {
      arr.reverse();
    }

    return arr;
  })();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sorting.type === SORTING_TYPE.ALPHABETICALLY ? '' : 'is-light'
          }`}
          onClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: SORTING_TYPE.ALPHABETICALLY,
            }))
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sorting.type === SORTING_TYPE.BY_LENGTH ? '' : 'is-light'
          }`}
          onClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              type: SORTING_TYPE.BY_LENGTH,
            }))
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sorting.isReversed ? '' : 'is-light'}`}
          onClick={() =>
            setSorting(currrentSorting => ({
              ...currrentSorting,
              isReversed: !currrentSorting.isReversed,
            }))
          }
        >
          Reverse
        </button>

        {(sorting.type || sorting.isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() =>
              setSorting({
                type: SORTING_TYPE.undefined,
                isReversed: false,
              })
            }
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
