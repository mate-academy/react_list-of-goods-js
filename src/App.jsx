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

export const App = () => {
  const [originalGoods] = useState(goodsFromServer);
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState('');
  const [reset, setReset] = useState(false);
  const [reversed, setReversed] = useState(false);

  const sortAlphabetically = () => {
    setSortOrder('alphabetically');
    setGoods([...goods].sort());
    setReversed(false);
    setReset(true);
  };

  const sortByLength = () => {
    setSortOrder('length');
    setGoods([...goods].sort(/* ... */));
    setReversed(false);
    setReset(true);
  };

  const reverseOrder = () => {
    setSortOrder(!reversed);
    setGoods([...goods].reverse());
    setReversed('');
    setReset(true);
  };

  const resetOrder = () => {
    setSortOrder('');
    setGoods(originalGoods);
    setReversed(false);
    setReset(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetically' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortOrder === 'reversed' ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
