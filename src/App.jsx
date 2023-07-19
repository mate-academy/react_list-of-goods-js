import { useState } from 'react';
import cn from 'classnames';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

const prepearGoods = (goods, sortBy, isReverse) => {
  const inputGoods = [...goods];

  if (!sortBy && isReverse) {
    inputGoods.reverse();
  }

  if (sortBy) {
    inputGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_ALPHABET:
          return isReverse
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return isReverse
            ? good2.length - good1.length
            : good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return inputGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  let prepearedGoods = prepearGoods(goodsFromServer, sortBy, isReverse);

  const reset = () => {
    setSortBy('');
    setIsReverse(false);
    prepearedGoods = goodsFromServer;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
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
        {prepearedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
