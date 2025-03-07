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

function getSortedGoods(goods, action, isReversed) {
  const sortedGoods = [...goods];

  if (action) {
    switch (action) {
      case SORT_ALPHABETICALLY:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SORT_BY_LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;

      default:
    }
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const goods = getSortedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_BY_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
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
