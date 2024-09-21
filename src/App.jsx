import { useState } from 'react';

import 'bulma/css/bulma.css';
import classNames from 'classnames';
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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState('');

  const SORT_BY_ALPHABET = 'alpha';
  const SORT_BY_LENGTH = 'length';

  function getSortedList(goods, sortBy, isReverse) {
    const sortedList = [...goods].sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });

    return isReverse ? sortedList.reverse() : sortedList;
  }

  const reset = () => {
    setReversed('');
    setSortType('');
  };

  const visibleGoods = getSortedList(goodsFromServer, sortType, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_BY_ALPHABET)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortType(SORT_BY_LENGTH)}
          type="button"
          className={classNames('button', 'is-succes', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>
        {(sortType.length || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
