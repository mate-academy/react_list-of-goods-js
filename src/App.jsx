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

function check(originalArray, currentArray) {
  for (let i = 0; i < originalArray.length; i += 1) {
    if (originalArray[i] !== currentArray[i]) {
      return false;
    }
  }

  return true;
}

function getPrepareGoods(goods, sortBy) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortId, setSortId] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPrepareGoods(goodsFromServer, sortId);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  const checkResult = check(goodsFromServer, visibleGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortId === SORT_FIELD_NAME ? '' : 'is-light'}`}
          onClick={() => setSortId(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortId === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortId(SORT_FIELD_LENGTH)}
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

        {!checkResult ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortId('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
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
