import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
// import cn from 'classnames';

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
  const SORTED_BY_LENGTH = 'length';
  const SORTED_BY_ALPHABET = 'alphabet';
  const REVERSE = 'YES';
  const NO_REVERSE = 'NO';
  const [visibleList, setVisibleList] = useState(goodsFromServer);
  const [sortedList, setSortedList] = useState('');
  const [isReversed, setIsReversed] = useState(NO_REVERSE);

  const sortByLength = () => {
    if (isReversed === REVERSE) {
      setVisibleList(
        [...goodsFromServer]
          .sort((good1, good2) => good1.length - good2.length)
          .reverse(),
      );
    } else {
      setVisibleList(
        [...goodsFromServer].sort(
          (good1, good2) => good1.length - good2.length,
        ),
      );
    }

    setSortedList(SORTED_BY_LENGTH);
  };

  const sortAlphabetically = () => {
    if (isReversed === REVERSE) {
      setVisibleList(
        [...goodsFromServer]
          .sort((good1, good2) => good1.localeCompare(good2))
          .reverse(),
      );
    } else {
      setVisibleList(
        [...goodsFromServer].sort((good1, good2) => good1.localeCompare(good2)),
      );
    }

    setSortedList(SORTED_BY_ALPHABET);
  };

  const reverseList = () => {
    setVisibleList([...visibleList].reverse());

    if (isReversed === REVERSE) {
      setIsReversed(NO_REVERSE);
    } else {
      setIsReversed(REVERSE);
    }
  };

  const resetList = () => {
    setVisibleList(goodsFromServer);

    setIsReversed(NO_REVERSE);
    setSortedList('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortedList === SORTED_BY_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortedList === SORTED_BY_LENGTH
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
            isReversed === REVERSE
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={reverseList}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(visibleList) && (
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
        {visibleList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
