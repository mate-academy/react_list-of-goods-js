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
  const [reversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  let visibleGoods = [...goodsFromServer];

  if (sortBy === 'alphabet') {
    visibleGoods.sort((word1, word2) => word1.localeCompare(word2));
  }

  if (sortBy === 'length') {
    visibleGoods.sort((word1, word2) => word1.length - word2.length);
  }

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  const handleReset = () => {
    setSortBy('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortBy('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'} `}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortBy !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
