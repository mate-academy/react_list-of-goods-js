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
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [activeSort, setActiveSort] = useState('');

  const sortAlphabetically = () => {
    setGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setActiveSort('alphabet');
    setIsReversed(false);
  };

  const sortByLength = () => {
    setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setActiveSort('length');
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
    setActiveSort('reversed');
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setActiveSort('');
    setIsReversed(false);
  };

  const isChanged = goods.join(',') !== goodsFromServer.join(',');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            activeSort === 'alphabet' && !isReversed ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            activeSort === 'length' && !isReversed ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            activeSort === 'reversed' ? '' : 'is-light'
          }`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
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
