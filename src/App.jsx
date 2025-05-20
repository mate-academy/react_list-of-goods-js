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
  const [sortGoods, setSortGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('');

  const sortByAlphabetically = () => {
    setSortGoods([...sortGoods].sort((a, b) => a.localeCompare(b)));
    setSortType('alphabetically');
  };

  const sortByLength = () => {
    setSortGoods([...sortGoods].sort((a, b) => a.length - b.length));
    setSortType('length');
  };

  const reverse = () => {
    setSortGoods([...sortGoods].reverse());
    setSortType('reverse');
  };

  const reset = () => {
    setSortGoods([...goodsFromServer]);
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === 'reverse' ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortType && (
          <button type="button" className="button is-info" onClick={reset}>
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
