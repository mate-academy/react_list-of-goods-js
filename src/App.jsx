/* eslint-disable default-case */
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

const SORT_FIELD_ALPHABET = 'Alphabet';
const SORT_FIELD_LENGTH = 'Length';

function prepareGoods(goods, { type, reverse }) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (type) {
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
    }

    return preparedGoods;
  });

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortQuery, setSortQuery] = useState({
    type: '',
    reverse: false,
  });
  const sortedGoods = prepareGoods(goodsFromServer, sortQuery);

  const setQueryValue = (queryType, queryValue) => {
    if (queryValue) {
      setSortQuery(prev => ({ ...prev, [queryType]: queryValue }));
    } else {
      setSortQuery(prev => ({ ...prev, [queryType]: !prev[queryType] }));
    }
  };

  const checkSortQuery = (query, value) => {
    if (value) {
      return sortQuery[query] === value;
    }

    return sortQuery[query];
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${checkSortQuery('type', SORT_FIELD_ALPHABET) || 'is-light'}`}
          onClick={() => setQueryValue('type', SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${checkSortQuery('type', SORT_FIELD_LENGTH) || 'is-light'}`}
          onClick={() => setQueryValue('type', SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${checkSortQuery('reverse') || 'is-light'}`}
          onClick={() => setQueryValue('reverse')}
        >
          Reverse
        </button>

        {(sortQuery.type || sortQuery.reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortQuery(() => ({ type: '', reverse: false }))}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
