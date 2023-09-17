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
  'Honey',
  'Jam',
  'Garlic',
];

const [getGoods, setGoods] = useState(goodsFromServer);

const sortAlphabetically = () => {
  const sortedGoods = [...getGoods].sort((a, b) => a.localeCompare(b));

  setGoods(sortedGoods);
};

const sortByLength = () => {
  const sortedGoods = [...getGoods].sort((a, b) => a.length - b.length);

  setGoods(sortedGoods);
};

const reverseList = () => {
  const reversedGoods = [...getGoods].reverse();

  setGoods(reversedGoods);
};

const resetList = () => {
  setGoods(goodsFromServer);
};

export const App = () => (
  <div className="section content">
    <div className="buttons">
      <button
        type="button"
        className="button is-info is-light"
        onClick={sortAlphabetically}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className="button is-success is-light"
        onClick={sortByLength}
      >
        Sort by length
      </button>

      <button
        type="button"
        className="button is-warning is-light"
        onClick={reverseList}
      >
        Reverse
      </button>

      <button
        type="button"
        className="button is-danger is-light"
        onClick={resetList}
      >
        Reset
      </button>
    </div>

    <ul>
      {getGoods.map((good, index) => (
        <li id={index} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  </div>
);
