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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null);
  const [reversed, setReversed] = useState(false);
  const handleAlphabet = () => {
    const sorted = [...goodsFromServer].sort();

    if (reversed) sorted.reverse();
    setGoods(sorted);
    setSortType('alphabet');
  };

  const handleLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (reversed) sorted.reverse();
    setGoods(sorted);
    setSortType('length');
  };

  const handleReverse = () => {
    setReversed(prev => !prev);
    if (sortType === 'alphabet') {
      const sorted = [...goodsFromServer].sort();

      if (!reversed) sorted.reverse();
      setGoods(sorted);
    }

    if (sortType === 'length') {
      const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

      if (!reversed) sorted.reverse();
      setGoods(sorted);
    }

    if (!sortType) {
      setGoods([...goods].reverse());
    }
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setReversed(false);
  };

  const isOriginalOrder = goods.join() === goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleAlphabet}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
