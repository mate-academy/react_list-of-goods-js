import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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

const SORT_BY_ALPHABET = 'alphabet-sorting';
const SORT_BY_LENGTH = 'length-sorting';

function getSortedGoods(goods, { sortMethod, reverse }) {
  const prepearedGoods = [...goods];

  if (sortMethod) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [reverse, setReverse] = useState(false);

  const reset = () => {
    setSortMethod('');
    setReverse(false);
  };

  const reverseSetter = () => {
    setReverse(!reverse);
  };

  const sortedList = getSortedGoods(goodsFromServer, { sortMethod, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortMethod !== SORT_BY_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortMethod !== SORT_BY_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseSetter}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sortMethod || reverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedList.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
