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
  const [data, setData] = useState(goodsFromServer);
  const [reversedStatus, setReversedStatus] = useState(false);
  const [sortingParam, setSortingParam] = useState('');

  const sortData = (sortArray, sortParam) => {
    if (sortParam === 'alphabet') {
      return sortArray.sort((a, b) => a.localeCompare(b));
    }

    if (sortParam === 'length') {
      return sortArray.sort(
        (a, b) => a.length - b.length || a.localeCompare(b),
      );
    }

    return goodsFromServer;
  };

  const handleSortAndReverse = sortParam => {
    return () => {
      const sortedData = sortData([...data], sortParam);

      if (sortParam && reversedStatus) {
        sortedData.reverse();
      }

      setSortingParam(sortParam);
      setData(sortedData);

      if (!sortParam) {
        setReversedStatus(false);
      }
    };
  };

  const toggleReversedStatus = () => {
    setReversedStatus(!reversedStatus);
    setData([...data].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortingParam === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAndReverse('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortingParam === 'length' ? '' : 'is-light'}`}
          onClick={handleSortAndReverse('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversedStatus ? '' : 'is-light'}`}
          onClick={toggleReversedStatus}
        >
          Reverse
        </button>

        {(reversedStatus || sortingParam !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleSortAndReverse('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {data.map(el => (
          <li key={el} data-cy="Good">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
