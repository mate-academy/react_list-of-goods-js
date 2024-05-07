import { useState } from 'react';

import 'bulma/css/bulma.css';
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

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [, setSortedBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    setGoods([...goods].sort());
    setSortedBy('alphabetically');
    setIsReversed(false);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setSortedBy('by length');
    setIsReversed(false);
  };

  const reverseOrder = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const resetOrder = () => {
    setGoods([...goodsFromServer]);
    setSortedBy(null);
    setIsReversed(false);
  };

  return (
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
          onClick={reverseOrder}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={resetOrder}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
