import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';

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
const STATE_ALPHABETICALLY = 'alpha';
const STATE_BY_LENGTH = 'Length';
const STATE_REVERSE = 'reverse';
const STATE_RESET = 'reset';

function sorting(list, state) {
  const listForSorting = [...list];

  if (state === STATE_ALPHABETICALLY) {
    return listForSorting.sort((item1, item2) => item1.localeCompare(item2));
  }

  if (state === STATE_BY_LENGTH) {
    return listForSorting.sort((item1, item2) => item1.length - item2.length);
  }

  if (state === STATE_REVERSE) {
    return listForSorting.reverse();
  }

  return list;
}

export const App = () => {
  const [state, setState] = useState(null);
  const [listOfGoods, setListOfGoods] = useState(goodsFromServer);
  const listForPrint = sorting(listOfGoods, state);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => {
            setState(STATE_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => {
            setState(STATE_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => {
            setState(STATE_REVERSE);
            setListOfGoods(listForPrint);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setState(STATE_RESET);
            setListOfGoods(goodsFromServer);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {listForPrint.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
