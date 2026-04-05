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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [ ...goodsFromServer ];

  if (sortType === 'alphabetically') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isDefaultOrder = sortType === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? 'is-active' : 'is-light'}`}
          onClick={() => setSortType('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? 'is-active' : 'is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? 'is-active' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good}
          data-cy="Good"
          >{good}</li>
        ))}
      </ul>
    </div>
  );
};

/* </div><div className="section content">
      <div className="buttons">
        <button type="button" className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        <li data-cy="Good">Dumplings</li>
        <li data-cy="Good">Carrot</li>
        <li data-cy="Good">Eggs</li>
        <li data-cy="Good">Ice cream</li>
        <li data-cy="Good">Apple</li>
        <li data-cy="Good">...</li>
      </ul>
    </div>
  </div> */
