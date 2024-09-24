import { useState } from 'react';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
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
