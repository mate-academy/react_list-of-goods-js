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

const sortedAlphabet = items => {
  return [...items].sort((goodOne, goodTwo) => goodOne.localeCompare(goodTwo));
};

const sortedReverse = items => {
  return [...items].reverse();
};

const sortedLength = items => {
  const sortedLengthItems = [...items].sort(
    (goodOne, goodTwo) => goodOne.length - goodTwo.length,
  );

  return sortedLengthItems;
};

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [originalGoods] = useState([...goodsFromServer]);
  const [currentSortType, setCurrentSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);
  const isResetVisible = currentSortType !== 'none' || isReversed;

  const applySorting = (sortType, shouldReverse) => {
    let sortedItems;

    if (sortType === 'alphabetical') {
      sortedItems = sortedAlphabet(originalGoods);
    } else if (sortType === 'length') {
      sortedItems = sortedLength(originalGoods);
    } else {
      sortedItems = [...originalGoods];
    }

    if (shouldReverse) {
      sortedItems = sortedReverse(sortedItems);
    }

    return sortedItems;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSortType === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => {
            const newSorted = applySorting('alphabetical', isReversed);

            setGoods(newSorted);
            setCurrentSortType('alphabetical');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSortType === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            const newSortedLength = applySorting('length', isReversed);

            setGoods(newSortedLength);
            setCurrentSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            const newReversedState = !isReversed;

            setIsReversed(newReversedState);

            const newSorted = applySorting(currentSortType, newReversedState);

            setGoods(newSorted);
          }}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setGoods(originalGoods);
              setCurrentSortType('none');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => {
          return (
            <li data-cy="Good" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
