import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const sortFields = { 
  SORT_FIELD_ALPHABET: 'alphabet',
  SORT_FIELD_LENGTH: 'length',
  SORT_FIELD_NONE: '',
}

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case sortFields.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case sortFields.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(sortFields.SORT_FIELD_NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortField !== sortFields.SORT_FIELD_ALPHABET },
          )}
          onClick={() => setSortField(sortFields.SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortField !== sortFields.SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortField(sortFields.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-danger',
            'is-light',
            { hidden: sortField === sortFields.SORT_FIELD_NONE },
          )}
          onClick={() => setSortField(sortFields.SORT_FIELD_NONE)}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
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
