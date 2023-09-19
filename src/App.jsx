import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
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

export const App = () => {
  const [isReversed, setIsreversed] = useState(false);
  const [sortType, setSortType] = useState('');
  const SORT_BY_ALPHABET = 'alphabet';
  const SORT_BY_LENGTH = 'length';

  function getSortedGoods(goods, sortField) {
    const goodsCopy = [...goods];

    if (sortType) {
      goodsCopy.sort((a, b) => {
        switch (sortField) {
          case SORT_BY_ALPHABET:
            return a.localeCompare(b);

          case SORT_BY_LENGTH:
            return a.length - b.length;

          default:
            return 0;
        }
      });
    }

    if (isReversed) {
      goodsCopy.reverse();
    }

    return goodsCopy;
  }

  const sortedGoods = getSortedGoods(goodsFromServer, sortType, isReversed);

  const resetButton = () => {
    setSortType('');
    setIsreversed(false);
  };

  const hiddenButton = isReversed || sortType;

  function toggleReverse() {
    setIsreversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SORT_BY_ALPHABET },
          )}
          onClick={() => setSortType(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {hiddenButton && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={resetButton}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
