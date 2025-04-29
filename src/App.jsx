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

const SORT_FIELD_ALF = 'alf';
const SORT_FIELD_LENGTH = 'length';

function getSortInfo(goods, { sortField, isRevesed }) {
  let prepedGoods = [...goods];

  if (sortField) {
    prepedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALF:
          return a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isRevesed) {
    prepedGoods = prepedGoods.reverse();
  }

  return prepedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsRevesed] = useState(false);

  const start = getSortInfo(goodsFromServer, {
    sortField,
    isRevesed: isReversed,
  });

  const reset = () => {
    setSortField('');
    setIsRevesed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ALF);
          }}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALF ? 'is-light' : ''} `}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsRevesed(!isReversed)}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            onClick={reset}
            type="button"
            className="button is-warning is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {start.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
