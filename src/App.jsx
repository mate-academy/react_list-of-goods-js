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
  const def = [...goodsFromServer];
  const [goods, setGoods] = useState(def);
  const [sort, setSort] = useState('none');
  const sortAlphabetically = () => {
    setGoods([...goods].sort((a, b) => b.localeCompare(a)));
    setSort('alphabetically');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setSort('bylength');
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setSort('reverse');
  };

  const resetGoods = () => {
    setGoods(def);
    setSort('none');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sort === 'alphabetically'
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sort === 'bylength'
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={sort === 'reverse'
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {sort !== 'none' && (
        <button
          type="button"
          className={sort !== def
            ? 'button is-danger'
            : 'button is-danger is-light'}
          onClick={resetGoods}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
