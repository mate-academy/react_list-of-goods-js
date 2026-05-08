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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';

function getPrepareGoods(goods, sortName, direction) {
  const prepareGods = [...goods];

  if (sortName) {
    prepareGods.sort((good1, good2) => {
      switch (sortName) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (direction === DIRECTION_UP) {
    prepareGods.reverse();
  }

  return prepareGods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [direction, setDirection] = useState(DIRECTION_DOWN);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortField, direction);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_FIELD_NAME
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            direction === DIRECTION_UP
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            if (direction === DIRECTION_DOWN) {
              setDirection(DIRECTION_UP);
            } else {
              setDirection(DIRECTION_DOWN);
            }
          }}
        >
          Reverse
        </button>
        {(sortField || direction !== DIRECTION_DOWN) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setDirection(DIRECTION_DOWN);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return <li data-cy="Good" key = {good} >{good}</li>;
        })}
      </ul>
    </div>
  );
};
