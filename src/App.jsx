import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SET_ALPHABETICALLY = `alphabetically`;
const SET_LENGTH = `length`;
const SET_REVERSE = `reverse`;

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SET_ALPHABETICALLY:
          return a.localeCompare(b);
        case SET_LENGTH:
          return a.length - b.length;
        case SET_REVERSE:
          return b.localeCompare(a);
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

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
  const [sortField, setSortField] = useState(``);
  const preparedGoods = getPreparedGoods(goodsFromServer, { sortField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SET_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${sortField === SET_ALPHABETICALLY ? '' : `is-light`}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SET_LENGTH)}
          type="button"
          className={`button is-info ${sortField === SET_LENGTH ? '' : `is-light`}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortField(SET_REVERSE)}
          type="button"
          className={`button is-info ${sortField === SET_REVERSE ? '' : `is-light`}`}
        >
          Reverse
        </button>

        <button
          onClick={() => setSortField(``)}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        {preparedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
