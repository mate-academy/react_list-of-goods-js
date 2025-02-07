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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort();

    setGoods(sortedGoods);
    setSortField('alphabetical');
    setIsReversed(false);
  };

  const sortBylength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(sortedGoods);
    setSortField('length');
    setIsReversed(false);
  };

  const reversedGoods = () => {
    const reversdGoods = [...goods].reverse();

    setGoods(reversdGoods);
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={sortBylength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={reversedGoods}
        >
          Reverse
        </button>

        {goods.join('') !== goodsFromServer.join('') && (
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
        {goods.map((good, index) => (
          <li key={index} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
