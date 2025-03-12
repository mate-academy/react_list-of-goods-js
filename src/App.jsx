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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_BY_LENGTH = 'length';

function getSortedGoods(goods, sortField, isToReverse) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isToReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const readyGoods = getSortedGoods(goodsFromServer, sortField, reverseField);

  function checkReverseField() {
    if (reverseField === true) {
      setReverseField(false);
    } else {
      setReverseField(true);
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortField === SORT_FIELD_ALPHABETICALLY ? '' : ' is-light'}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortField === SORT_FIELD_BY_LENGTH ? '' : ' is-light'}`}
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${reverseField === true ? '' : ' is-light'}`}
          onClick={() => checkReverseField()}
        >
          Reverse
        </button>

        {sortField === '' && reverseField === false ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {readyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
