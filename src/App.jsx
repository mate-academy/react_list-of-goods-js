import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

function getPreparedGoods(goods, { sortField, isReverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABET)}
          type="button"
          className={
            classNames('button is-info', {
              'is-light': sortField !== SORT_BY_ALPHABET,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={
            classNames('button is-success', {
              'is-light': sortField !== SORT_BY_LENGTH,
            })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!isReverse);
          }}
          type="button"
          className={
            classNames('button is-warning', {
              'is-light': isReverse !== true,
            })
          }
        >
          Reverse
        </button>

        {
          sortField || isReverse
            ? (
              <button
                onClick={() => {
                  setSortField('');
                  setReverse(false);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
            : ''
          }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
