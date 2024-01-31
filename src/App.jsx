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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPrepareGoods(goods, sortField, reverse) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const renderGoods = getPrepareGoods(goodsFromServer, sortField, reverse);

  function getReset() {
    setReverse(false);
    setSortField('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === SORT_FIELD_NAME
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortField === SORT_FIELD_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverse
            ? 'button is-warning'
            : 'button is-warning is-light'
          }
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => getReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}

      </ul>
    </div>
  );
};
