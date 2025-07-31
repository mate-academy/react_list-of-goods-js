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
  const [sortGoods, setGoods] = useState([...goodsFromServer]);
  const [active, setActive] = useState('');
  const sort = () => {
    setGoods([...sortGoods].sort((a, b) => a.localeCompare(b)));
    setActive('Sort alphabetically');
  };

  const sortByLength = () => {
    setGoods([...sortGoods].sort((a, b) => a.length - b.length));
    setActive('Sort by length');
  };

  const reverse = () => {
    setGoods([...sortGoods].reverse());
    setActive('Reverse');
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setActive('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sort}
          className={`button is-info ${active === 'Sort alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${active === 'Sort by length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={`button is-warning ${active === 'Reverse' ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={reset}
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        {sortGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
