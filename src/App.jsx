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

const ALPHABETICAL_ORDER = 'alphabet';
const LENGTH_ORDER = 'length';

function getPreparedGoods(goods, { sortGoods, reversed }) {
  const preparedGoods = [...goods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case ALPHABETICAL_ORDER:
          return good1.localeCompare(good2);

        case LENGTH_ORDER:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortGoods,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortGoods === ALPHABETICAL_ORDER ? '' : 'is-light'}`}
          onClick={() => setSortGoods(ALPHABETICAL_ORDER)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortGoods === LENGTH_ORDER ? '' : 'is-light'}`}
          onClick={() => setSortGoods(LENGTH_ORDER)}
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
