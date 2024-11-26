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

// export const handleLengthSort = () => {

// };

const SORT_ALPHABET = 'alphabetic';
const SORT_LENGTH = 'length';

export const sortGoods = (goods, params) => {
  const { sortBy, isReversed } = params;
  const sortedGoods = [...goods];

  if (sortBy.length) {
    sortedGoods.sort((good1, good2) => {
      if (sortBy === SORT_ALPHABET) {
        return good1.localeCompare(good2);
      }

      if (sortBy === SORT_LENGTH) {
        return good1.length - good2.length;
      }

      throw new Error('There is no such type of sort');
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setReversed] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, { sortBy, isReversed });

  const resetAll = () => {
    setSortBy('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SORT_ALPHABET,
          })}
          onClick={() => setSortBy(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SORT_LENGTH,
          })}
          onClick={() => setSortBy(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortBy || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetAll()}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
