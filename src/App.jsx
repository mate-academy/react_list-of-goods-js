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

function prepairGoods(goods, sortField) {
  const prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case 'Sort alphabetically':
          return goods1.localeCompare(goods2);

        case 'Sort by length':
          return goods1.length - goods2.length;

        default:
          return 0;
      }
    });
  }

  return prepGoods;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  let visibleGoods = prepairGoods(goodsFromServer, sortGoods);
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortGoods === 'Sort alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            setSortGoods('Sort alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortGoods === 'Sort by length' ? '' : 'is-light'}`}
          onClick={() => {
            setSortGoods('Sort by length');
          }}
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

        {(sortGoods || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortGoods('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};