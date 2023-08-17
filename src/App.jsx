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

//

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reversed }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return goods1.localeCompare(goods2);

        case SORT_FIELD_LENGTH:
          return goods1.length - goods2.length;

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
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reversed },
  );

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={setSortField === SORT_FIELD_NAME
            ? 'button is-info'
            : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={setSortField === SORT_FIELD_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reversed
            ? 'button is-warning'
            : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={reversed
              ? 'button is-danger'
              : 'button is-danger is-light'
            }
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
