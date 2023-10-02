import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

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

function getPreparedGoods(goods, sortBy, reverseStatus) {
  const preperedGoods = [...goods];

  if (sortBy) {
    preperedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseStatus) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [reverseStatus, setReverseStatus] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, reverseStatus);

  const reset = () => {
    setSortBy('');
    setReverseStatus(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
          className={classNames('button is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_LENGTH)}
          className={classNames('button is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseStatus(!reverseStatus)}
          className={classNames('button is-warning', {
            'is-light': !reverseStatus,
          })}
        >
          Reverse
        </button>

        {(sortBy !== '' || reverseStatus) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
