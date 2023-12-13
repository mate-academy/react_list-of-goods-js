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

const sortOptions = {
  alphabetic: 'alphabetic',
  length: 'length',
  reverse: 'reverse',
  default: '',
};

const getPrepareGoods = (goods, {
  sortBy,
  isReversed,
}) => {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case sortOptions.alphabetic:
          return a.localeCompare(b);

        case sortOptions.length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState(sortOptions.default);
  const [isReversed, setIsReversed] = useState(false);

  const isOptionsModified = sortBy !== sortOptions.default || isReversed;

  const preparedGoods = getPrepareGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  const reset = () => {
    setSortBy(sortOptions.default);
    setIsReversed(false);
  };

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== sortOptions.alphabetic,
          })}
          onClick={() => setSortBy(sortOptions.alphabetic)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== sortOptions.length,
          })}
          onClick={() => setSortBy(sortOptions.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isOptionsModified && (
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
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
