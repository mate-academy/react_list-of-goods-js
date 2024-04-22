import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORTING_OPTIONS = {
  BY_LENGTH: 'length',
  ALPHABETICALLY: 'alphabet',
};

const getPreparedGoods = (goods, { sortedField, reversed }) => {
  const preparedGoods = [...goods];

  if (sortedField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedField) {
        case SORTING_OPTIONS.ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORTING_OPTIONS.BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortedField, setSortedField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortedField,
    reversed,
  });

  const isResetVisible = sortedField !== '' || reversed !== false;

  const resetState = () => {
    setSortedField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortedField(SORTING_OPTIONS.ALPHABETICALLY)}
          type="button"
          className={cn(
            { 'is-light': sortedField !== SORTING_OPTIONS.ALPHABETICALLY },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortedField(SORTING_OPTIONS.BY_LENGTH)}
          type="button"
          className={cn(
            { 'is-light': sortedField !== SORTING_OPTIONS.BY_LENGTH },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(value => !value)}
          type="button"
          className={cn({ 'is-light': !reversed }, 'button is-warning')}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={resetState}
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
