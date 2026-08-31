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

const sortAlphabetically = goods => [...goods].sort((a, b) => a.localeCompare(b));

const sortByLength = goods =>
  [...goods].sort((a, b) => a.length - b.length || a.localeCompare(b));

const getVisibleGoods = (goods, sortType, reversed) => {
  let visibleGoods = [...goods];

  if (sortType === 'alphabet') {
    visibleGoods = sortAlphabetically(visibleGoods);
  }

  if (sortType === 'length') {
    visibleGoods = sortByLength(visibleGoods);
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortType, reversed);
  const isOriginalOrder = sortType === null && !reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(current => !current)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(null);
              setReversed(false);
            }}
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
