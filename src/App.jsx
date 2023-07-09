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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGoods(goods, sortField, isRev) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;

      case SORT_FIELD_NAME:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  if (isRev) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isRev, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, sortField, isRev);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_NAME && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(current => !current)}
          type="button"
          className={`button is-warning ${sortField !== SORT_FIELD_REVERSE && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isRev) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(goods => (
          <li data-cy="Good">{goods}</li>
        ))}
      </ul>
    </div>
  );
};
