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

const SORT_ALPHABETICALLY = 'alphabetical';
const SORT_BY_LENGTH = 'length';
const DIRECTION_NORMAL = 'normal';
const DIRECTION_REVERSE = 'reverse';

function getPrepearedGoods(goods, sortfield, direction) {
  let prepearedGoods = [...goodsFromServer];

  if (sortfield) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortfield) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (direction === DIRECTION_REVERSE) {
    prepearedGoods = [...prepearedGoods].reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortfield, setSortfield] = useState('');
  const [direction, setDirection] = useState(DIRECTION_NORMAL);
  const visibleGoods = getPrepearedGoods(goodsFromServer, sortfield, direction);
  const isDirty = sortfield !== '' || direction !== DIRECTION_NORMAL;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortfield(SORT_ALPHABETICALLY);
          }}
          type="button"
          className={
            sortfield === SORT_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortfield(SORT_BY_LENGTH);
          }}
          type="button"
          className={
            sortfield === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setDirection(
              direction === DIRECTION_NORMAL
                ? DIRECTION_REVERSE
                : DIRECTION_NORMAL,
            );
          }}
          type="button"
          className={
            direction === DIRECTION_REVERSE
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {isDirty && (
          <button
            onClick={() => {
              setSortfield('');
              setDirection(DIRECTION_NORMAL);
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
