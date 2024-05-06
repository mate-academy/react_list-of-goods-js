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

const SORT_EMPTY = '';
const SORT_TYPE_ALPHABET = 'alphabet';
const SORT_TYPE_LENGTH = 'length';
const IS_REVERSED = false;

function getPreperedArray(goods, { sortType, isReversed }) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SORT_TYPE_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_TYPE_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SORT_EMPTY);
  const [isReversed, setIsReversed] = useState(IS_REVERSED);

  const reset = () => {
    setIsReversed(IS_REVERSED);
    setSortType(SORT_EMPTY);
  };

  const visibleGoods = getPreperedArray(goodsFromServer, {
    sortType,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_TYPE_ALPHABET)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SORT_TYPE_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isReversed || sortType) && (
          <button
            onClick={() => reset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => {
          return (
            <li key={`${good}${index + 1}`} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
