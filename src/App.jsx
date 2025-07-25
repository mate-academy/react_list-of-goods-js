import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

const sortGoods = (goods, sortField, isReversed) => {
  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return a.localeCompare(b);
      case SORT_FIELD_LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [goodsList, setGoodsList] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    if (sortType === null && !isReversed) {
      setGoodsList([...goodsFromServer]);
    } else {
      const sorted = sortGoods(goodsFromServer, sortType, isReversed);

      setGoodsList(sorted);
    }
  }, [sortType, isReversed]);

  const handleSort = type => {
    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const isModified = sortType !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
