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


function isInitialOrder(a, b) {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);

  const [mode, setMode] = useState('none');

  const [isReversed, setIsReversed] = useState(false);


  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    setGoods(isReversed ? sorted.slice().reverse() : sorted);
    setMode('alpha');
  };

  
  const sortByLength = () => {
    const sorted = [...goodsFromServer]
      .sort((a, b) => a.length - b.length || a.localeCompare(b));
    setGoods(isReversed ? sorted.slice().reverse() : sorted);
    setMode('length');
  };

  
  const reverseGoods = () => {
    setIsReversed(prev => {
      const next = !prev;

      if (mode === 'alpha') {
        const base = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
        setGoods(next ? base.slice().reverse() : base);
      } else if (mode === 'length') {
        const base = [...goodsFromServer]
          .sort((a, b) => a.length - b.length || a.localeCompare(b));
        setGoods(next ? base.slice().reverse() : base);
      } else {
        setGoods(g => g.slice().reverse());
      }

      return next;
    });
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setMode('none');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${mode === 'alpha' ? '' : ' is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${mode === 'length' ? '' : ' is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isInitialOrder(goods, goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
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
