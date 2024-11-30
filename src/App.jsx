import classNames from 'classnames';
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

const SORT_BY_FIELDS = {
  alphabet: 'byAlphabet',
  length: 'byLength',
};

const sortGoods = (goods, params) => {
  const copyGoods = [...goods];
  const { sortedBy, isReversed } = params;

  if (sortedBy) {
    copyGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case SORT_BY_FIELDS.alphabet:
          return good1.localeCompare(good2);
        case SORT_BY_FIELDS.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const hasChanged = Boolean(sortedBy || isReversed);

  const handleReset = () => {
    setSortedBy('');
    setIsReversed(false);
  };

  const sortedGoods = sortGoods(goodsFromServer, {
    sortedBy,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortedBy(SORT_BY_FIELDS.alphabet);
          }}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== SORT_BY_FIELDS.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortedBy(SORT_BY_FIELDS.length);
          }}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== SORT_BY_FIELDS.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {hasChanged && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
