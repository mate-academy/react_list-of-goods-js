import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import React, { useState } from 'react';

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

const FilterField = {
  Alphabet: 'alphabet',
  Length: 'length',
};

const getPreparedGoods = (sortField, isReversed) => {
  const preparedGoods = [...goodsFromServer];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case FilterField.Length:
          return a.length - b.length;
        case FilterField.Alphabet:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== FilterField.Alphabet },
            'button is-info',
          )}
          onClick={() => setSortField(FilterField.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== FilterField.Length },
            'button is-info',
          )}
          onClick={() => setSortField(FilterField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({ 'is-light': isReversed === false }, 'button is-info')}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
