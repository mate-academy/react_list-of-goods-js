import cn from 'classnames';
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

const SORT_ALPH = 'alph';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reversed, searchField }) {
  const preparedGoods = [...goods];

  if (searchField) {
    const lowerSearch = searchField.toLowerCase();

    return preparedGoods.filter(
      item => item.toLowerCase().includes(lowerSearch),
    );
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPH:
          return good1.localeCompare(good2);
        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [searchField, setSearchField] = useState('');

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed: isReversed,
    searchField,
  });

  const sortAlphabetically = () => {
    setSortField(SORT_ALPH);
  };

  const sortByLength = () => {
    setSortField(SORT_LENGTH);
  };

  const reverse = () => {
    setIsReversed(revers => !revers);
  };

  const reset = () => {
    setIsReversed(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            ' is-light': sortField !== SORT_ALPH,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            ' is-light': sortField !== SORT_LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            ' is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

        <input
          placeholder="Search"
          value={searchField}
          onChange={event => setSearchField(event.target.value)}
        />
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
