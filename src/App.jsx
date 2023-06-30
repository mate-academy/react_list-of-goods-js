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

const SORT_BY_ALPHABET = 'sortByAlphabet';
const SORT_BY_LENGTH = 'sortByLength';

const sortGoods = (sortBy) => {
  const copy = [...goodsFromServer];

  switch (sortBy) {
    case SORT_BY_ALPHABET:
      return copy.sort((good1, good2) => good1.localeCompare(good2));

    case SORT_BY_LENGTH:
      return copy.sort((good1, good2) => good1.length - good2.length);

    case '':
      return copy;

    default:
      return 0;
  }
};

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [goods, setGoods] = useState([...goodsFromServer]);

  const resetSorting = () => {
    setIsReversed(false);
    setSortBy('');
    setGoods([...goodsFromServer]);
  };

  const sortOnClick = (parameter) => {
    setSortBy(parameter);

    const sortedGoods = sortGoods(parameter);

    setGoods(sortedGoods);
  };

  const setAscOrder = () => {
    sortOnClick(sortBy);
    setIsReversed(!isReversed);
  };

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', ['is-info'], {
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
          onClick={() => sortOnClick(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', ['is-success'], {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => sortOnClick(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', ['is-warning'], {
            'is-light': !isReversed,
          })}
          onClick={() => (!isReversed
            ? setIsReversed(!isReversed)
            : setAscOrder()
          )}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
