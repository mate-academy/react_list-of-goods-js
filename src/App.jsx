import React, { useState } from 'react';
import classNames from 'classnames';
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

const REVERSE_DEFAULT_VALUE = false;
const SORT_FIELD_ALPHABETICAL = 'alphabetical';
const SORT_FIELD_LENGTH = 'length';

function getGoodsPrepared(goods, sortField, reverseSort) {
  const goodsPrepared = [...goods];

  if (sortField) {
    goodsPrepared.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICAL:
          return a.localeCompare(b);

        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverseSort) {
    goodsPrepared.reverse();
  }

  return goodsPrepared;
}

function renderButton(label, onClick, isActive, colorClass) {
  return (
    <button
      type="button"
      className={classNames('button', colorClass, {
        'is-light': isActive,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseSort, setReverseSort] = useState(REVERSE_DEFAULT_VALUE);
  const sortedGoods = getGoodsPrepared(goodsFromServer, sortField, reverseSort);

  return (
    <div className="section content">
      <div className="buttons">
        {renderButton(
          'Sort alphabetically',
          () => setSortField(SORT_FIELD_ALPHABETICAL),
          sortField !== SORT_FIELD_ALPHABETICAL,
          'is-info',
        )}

        {renderButton(
          'Sort by length',
          () => setSortField(SORT_FIELD_LENGTH),
          sortField !== SORT_FIELD_LENGTH,
          'is-success',
        )}

        {renderButton(
          'Reverse',
          () => setReverseSort(!reverseSort),
          !reverseSort,
          'is-warning',
        )}

        {(sortField || reverseSort) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField('');
              setReverseSort(REVERSE_DEFAULT_VALUE);
            }}
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
