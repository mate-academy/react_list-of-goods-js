import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

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
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prevState => !prevState)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
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
