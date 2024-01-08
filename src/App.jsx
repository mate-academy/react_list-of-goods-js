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

export const App = () => {
  const [sortedList, setSortedList] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  // const [isReversed, setIsReversed] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const sortByAlphabet = () => {
    setSortedList([...sortedList]
      .sort((good1, good2) => good1.localeCompare(good2)));
    setSortField('alphabet');
    setIsModified(true);
  };

  const sortByLength = () => {
    setSortedList([...sortedList].sort((good1, good2) => {
      const length1 = good1.length;
      const length2 = good2.length;

      if (length1 < length2) {
        return -1;
      }

      if (length1 > length2) {
        return 1;
      }

      return sortedList.indexOf(good1) - sortedList.indexOf(good2);
    }));
    setSortField('length');
    setIsModified(true);
  };

  const reverseList = () => {
    const newSortedList = [...sortedList].reverse();

    setSortedList(newSortedList);
    setSortField(sortField === 'reverse' ? '' : 'reverse');
    // setIsReversed(!isReversed);
    setIsModified(true);
  };

  const resetList = () => {
    setSortedList([...goodsFromServer]);
    setSortField('reset');
    setIsModified(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortField !== 'alphabet' },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortField !== 'length' },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': sortField !== 'reverse' },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className={classNames(
              'button',
              'is-danger',
              'is-light',
            )}
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedList.map(good => (
          <li key={good} data-cy={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
