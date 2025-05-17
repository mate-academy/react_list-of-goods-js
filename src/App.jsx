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

function sortGoods(goods, sortType) {
  const preparedGoods = [...goods];

  if (sortType === 'abc') {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'length') {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  return preparedGoods;
}

export const App = () => {
  const [selectedSortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);
  let visibaleGoods = sortGoods(goodsFromServer, selectedSortType);

  if (reversed) {
    visibaleGoods = [...visibaleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectedSortType === 'abc' ? '' : 'is-light'}`}
          onClick={() => setSortType('abc')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${selectedSortType === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {selectedSortType === '' && reversed === false ? null : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibaleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
