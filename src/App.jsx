import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

const GoodList = ({ goodsArray }) => {
  return (
    <ul>
      {goodsArray.map(item => (
        <li key={item} data-cy="Good">
          {item}
        </li>
      ))}
    </ul>
  );
};

const sorting = (array, isReversed, sortField) => {
  let sortedArray = [...array];

  if (sortField === 'alphabetically') {
    sortedArray.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === 'length') {
    sortedArray.sort((good1, good2) => good1.length - good2.length);
  } else if (sortField === 'reset') {
    sortedArray = array;
  }

  if (isReversed) {
    sortedArray.reverse();
  }

  return sortedArray;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [isVisibleReset, setIsVisibleReset] = useState(false);
  const sortByAlphabetically = () => {
    setSortField('alphabetically');
    setIsVisibleReset(true);
  };

  const sortByLength = () => {
    setSortField('length');
    setIsVisibleReset(true);
  };

  const reverseButton = () => {
    setIsReversed(prev => {
      const nextReversedState = !prev;

      if (!nextReversedState) {
        setIsVisibleReset(false);
      } else {
        setIsVisibleReset(true);
      }

      return nextReversedState;
    });
  };

  const resetButton = () => {
    setSortField('reset');
    setIsReversed(false);
    setIsVisibleReset(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabetically}
          type="button"
          className={`button is-info ${sortField === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'} `}
        >
          Sort by length
        </button>

        <button
          onClick={reverseButton}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {isVisibleReset && (
          <button
            onClick={resetButton}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goodsArray={sorting(goodsFromServer, isReversed, sortField)} />
    </div>
  );
};
