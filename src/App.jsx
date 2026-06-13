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
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  if (sortBy === 'alphabet') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length)
  }

  if (isReversed === true) {
    visibleGoods.reverse();
  }

return (

  <div className="section content">
      <div className="buttons">
      <button
        type="button"
        className={sortBy === 'alphabet' ? "button is-info" : "button is-info is-light"}
        onClick={() => setSortBy('alphabet')}
      >
          Sort alphabetically
        </button>

      <button
        type="button"
        className={sortBy === 'length' ? "button is-success" : "button is-success is-light"}
        onClick={() => setSortBy('length')}
      >
          Sort by length
        </button>

      <button
        type="button"
        className={isReversed ? "button is-warning" : "button is-warning is-light"}
        onClick={() => setIsReversed(!isReversed)}
      >
          Reverse
        </button>

      {(sortBy !== '' || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortBy('');
            setIsReversed(false);
          }}
        >
          Reset
        </button>
      )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  )
};
