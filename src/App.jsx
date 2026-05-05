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

const SORT_TYPE_LENGTH = 'length';
const SORT_TYPE_ALPHABET = 'alphabet';
const SORT_TYPE_RESET = 'reset';

const prepareGoods = (goods, typeSort, isReversed) => {
  const preparedGoods = [...goods];

  if (typeSort === SORT_TYPE_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (typeSort === SORT_TYPE_ALPHABET) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = prepareGoods(goodsFromServer, sortType, isReversed);

  function sortAlphHandler() {
    setSortType(SORT_TYPE_ALPHABET);
  }

  function sortByLengthHandler() {
    setSortType(SORT_TYPE_LENGTH);
  }

  function reverseHandler() {
    setIsReversed(prev => !prev);
  }

  function resetHandler() {
    setIsReversed(false);
    setSortType(SORT_TYPE_RESET);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_TYPE_ALPHABET,
          })}
          onClick={() => sortAlphHandler()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={() => sortByLengthHandler()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => reverseHandler()}
        >
          Reverse
        </button>

        {(isReversed ||
          sortType === SORT_TYPE_ALPHABET ||
          sortType === SORT_TYPE_LENGTH) && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': sortType !== SORT_TYPE_RESET,
            })}
            onClick={() => resetHandler()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
