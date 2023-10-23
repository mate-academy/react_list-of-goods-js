import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const goodsFromServer = [
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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

const sortGoods = (goods, sort, reverse) => {
  const sortedGoods = [...goods];

  switch (sort) {
    case SORT_ALPHABET:
      sortedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;
    case SORT_LENGTH:
      sortedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;
    default:
      break;
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goodsRender = sortGoods(goodsFromServer, sort, isReversed);

  const reset = () => {
    setSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sort !== SORT_ALPHABET,
          })}
          onClick={() => setSort(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== SORT_LENGTH,
          })}
          onClick={() => setSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {(sort || isReversed) && (
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
        {goodsRender.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
