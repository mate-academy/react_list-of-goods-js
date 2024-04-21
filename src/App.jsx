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

const LENGTH = 'length';
const ALPHABET = 'alphabet';

const getPreparedGoods = (goods, { sortedField, reversed }) => {
  const preparedGoods = [...goods];

  if (sortedField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedField) {
        case ALPHABET:
          return good1.localeCompare(good2);
        case LENGTH:
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
  const [sortedField, setSortedField] = useState(false);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortedField,
    reversed,
  });

  const isResetVisible = sortedField !== false || reversed !== false;

  const resetState = () => {
    setSortedField(false);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortedField(ALPHABET)}
          type="button"
          className={cn(
            { 'is-light': sortedField !== ALPHABET },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortedField(LENGTH)}
          type="button"
          className={cn(
            { 'is-light': sortedField !== LENGTH },
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
