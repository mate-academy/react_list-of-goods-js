import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';
import 'bulma/css/bulma.css';

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

const SORT_ALPHABET_FIELD = 'alph';
const SORT_LENGTH_FIELD = 'length';

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABET_FIELD:
          return good1.localeCompare(good2);

        case SORT_LENGTH_FIELD:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const isAlphabetSelected = sortField !== SORT_LENGTH_FIELD;
  const isLengthSelected = sortField !== SORT_ALPHABET_FIELD;
  const isResetBtnVisible = reverse || sortField;
  const handleResetClick = () => {
    setReverse(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isLengthSelected,
          })}
          onClick={() => setSortField(SORT_ALPHABET_FIELD)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !isAlphabetSelected,
          })}
          onClick={() => setSortField(SORT_LENGTH_FIELD)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {isResetBtnVisible && (
          <button
            onClick={handleResetClick}
            className="button is-danger is-light"
            type="button"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
