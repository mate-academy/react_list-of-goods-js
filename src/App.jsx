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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_SUCCESS = 'alphabetical';
const SORT_REVERSE = 'reversed';

function getPreparedGoods(goods, { sortFiled, reversed }) {
  const preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case SORT_FIELD_SUCCESS:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    switch (reversed) {
      case SORT_REVERSE:
        return preparedGoods.reverse();
      default:
        return preparedGoods;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortFiled, setSortFiled] = useState('');
  const [reversed, setReversed] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortFiled,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${sortFiled === SORT_FIELD_SUCCESS ? '' : 'is-light'}`}
          onClick={() => setSortFiled(SORT_FIELD_SUCCESS)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortFiled === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortFiled(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed === SORT_REVERSE ? '' : 'is-light'}`}
          onClick={() => {
            if (reversed === '') {
              setReversed(SORT_REVERSE);
            } else {
              setReversed('');
            }
          }}
        >
          Reverse
        </button>

        {(sortFiled !== '' || reversed !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFiled('');
              setReversed('');
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
