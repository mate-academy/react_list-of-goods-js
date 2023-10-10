import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, isReversed) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={cn(
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn(
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prevState => !prevState)}
          className={cn(
            { 'is-light': !isReversed },
            'button is-warning',
          )}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
        <button
          type="button"
          onClick={() => {
            setSortField('');
            setIsReversed(false);
          }}
          className="button is-danger"
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
