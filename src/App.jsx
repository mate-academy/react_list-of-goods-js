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

const SORTED_ALPHABET = 'alphabet';
const SORTED_LENGTH = 'length';

function getPreparedGoods(goods, sortedGoods, isGoodReversed) {
  const copyGoods = [...goodsFromServer];

  if (sortedGoods) {
    copyGoods.sort((good1, good2) => {
      switch (sortedGoods) {
        case SORTED_ALPHABET:
          return good1.localeCompare(good2);

        case SORTED_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isGoodReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isGoodReversed, setIsGoodReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isGoodReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => (setSortField(SORTED_ALPHABET))}
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortField !== SORTED_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORTED_LENGTH)}
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortField !== SORTED_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isGoodReversed },
          )}
          onClick={() => setIsGoodReversed(!isGoodReversed)}
          type="button"
        >
          Reverse
        </button>

        {(sortField || isGoodReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsGoodReversed(false);
                setSortField('');
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
