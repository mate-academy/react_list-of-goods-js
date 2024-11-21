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

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';
const RESET = 'Reset';

function getPreparedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);

  const sortGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const reset = () => {
    setReversed(false);
    setSortField('');
  };

  const sortByAlphabet = () => {
    setSortField(SORT_BY_ALPHABET);
  };

  const sortByLength = () => {
    setSortField(SORT_BY_LENGTH);
  };

  const sortByReverse = () => {
    setReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          {SORT_BY_ALPHABET}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={sortByLength}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={sortByReverse}
        >
          {REVERSE}
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            {RESET}
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
