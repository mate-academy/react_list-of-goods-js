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
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [reversed, setReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState(''); // 'alphabet' | 'length' | ''

  const sortAlphabetically = () => {
    setSortMethod('alphabet');
    setVisibleGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setReversed(false);
  };

  const sortByLength = () => {
    setSortMethod('length');
    setVisibleGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setReversed(false);
  };

  const reverseGoods = () => {
    setReversed(!reversed);
    setVisibleGoods(prevGoods => [...prevGoods].reverse());
  };

  const resetGoods = () => {
    setSortMethod('');
    setReversed(false);
    setVisibleGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMethod === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMethod === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!(sortMethod === '' && !reversed) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
