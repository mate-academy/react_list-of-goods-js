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

const SORT_ASC = 'abc';
const SORT_BY_LENGTH = 'byLength';
const INITIAL_VALUE = '';

const sortFunc = (goods, sortBy, reverse) => {
  const arr = [...goods];

  switch (sortBy) {
    case SORT_ASC:
      arr.sort();
      break;

    case SORT_BY_LENGTH:
      arr.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return reverse
    ? arr.reverse()
    : arr;
};

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState(INITIAL_VALUE);

  const sortedGoods = sortFunc(goodsFromServer, sortedBy, reversed);

  const resetFunc = () => {
    setReversed(false);
    setSortedBy(INITIAL_VALUE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortedBy(SORT_ASC)}
          className={cn('button', 'is-info', {
            'is-light': sortedBy !== SORT_ASC,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortedBy(SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortedBy !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortedBy || reversed) && (
          <button
            type="button"
            onClick={resetFunc}
            className="button is-danger is-light"
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
