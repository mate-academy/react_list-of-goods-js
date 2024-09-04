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

const SORT_ALPHABET = 'by-alph';
const SORT_LENGTH = 'by-length';

function handleSort(goods, { sortType, isReversed }) {
  const sortedGoods = [...goods];

  if (sortType) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const isReset = sortType || isReversed;

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const sortedGood = handleSort(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_ALPHABET,
          })}
          onClick={() => setSortType(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_LENGTH,
          })}
          onClick={() => setSortType(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', !isReversed && 'is-light')}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGood.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
