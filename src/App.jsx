import { useState } from 'react';
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

export const App = () => {
  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);
  let currentList = [...goodsFromServer];
  let initialOrder = true;

  const sortByAlphabet = () => {
    setSortType('byAlphabet');
    setIsReversed(false);
  };

  const sortByLength = () => {
    setSortType('byLength');
    setIsReversed(false);
  };

  const sortReversed = () => {
    setIsReversed(!isReversed);
  };

  const resetList = () => {
    setSortType('none');
    setIsReversed(false);
  };

  if (sortType === 'byAlphabet') {
    currentList = [...currentList].sort((item1, item2) =>
      item1.localeCompare(item2),
    );
  }

  if (sortType === 'byLength') {
    currentList = [...currentList].sort(
      (item1, item2) => item1.length - item2.length,
    );
  }

  if (isReversed) {
    currentList = [...currentList].reverse();
  }

  if (sortType === 'none' && !isReversed) {
    initialOrder = false;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === 'byAlphabet'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === 'byLength'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={sortReversed}
        >
          Reverse
        </button>

        {initialOrder === true && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {[...currentList].map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
