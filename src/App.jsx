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

const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard key={good} good={good} />
    ))}
  </ul>
);

const GoodCard = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

const SORT_BY = {
  ALPHABET: 'alphabeticaly',
  LENGTH: 'length',
  NONE: '',
};

function getPreparedGoods(goods, { sortField, reversed }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY.ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_BY.NONE);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reversed },
  );

  const reset = () => {
    setReversed(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY.LENGTH)}
          className={sortField === SORT_BY.LENGTH
            ? 'button is-info'
            : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY.ALPHABET)}
          className={sortField === SORT_BY.ALPHABET
            ? 'button is-success'
            : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={reversed
            ? 'button is-warning'
            : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
