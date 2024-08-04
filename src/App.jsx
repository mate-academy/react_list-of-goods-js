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

const SORT_FIELD_ALPHABET = 'aplha';
const SORT_FIELD_LENGTH = 'length';

function getPrepearedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        prepearedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SORT_FIELD_LENGTH:
        prepearedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        return prepearedGoods;
    }
  }

  if (isReversed) {
    return prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [isResetButtonVisible, setIsResetButtonVisible] = useState(false);

  const resetSort = () => {
    setSortField('');
    setIsReversed(false);
    setIsResetButtonVisible(false);
  };

  const handleSortClick = field => {
    getPrepearedGoods(goodsFromServer, field);
    setIsResetButtonVisible(true);
    setSortField(field);
  };

  const handleReverseClick = () => {
    setIsReversed(prevIsReversed => {
      const newReversed = !prevIsReversed;

      setIsResetButtonVisible(
        prevIsResetButtonVisible => sortField || newReversed,
      );

      return newReversed;
    });
  };

  const visibleGoods = getPrepearedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSortClick(SORT_FIELD_ALPHABET)}
          className={`button is-info ${sortField === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSortClick(SORT_FIELD_LENGTH)}
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            onClick={resetSort}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
