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
  const initialGoods = [...goodsFromServer];

  const [goods, setGoods] = useState(initialGoods);
  const [sortField, setSortField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (field, reverse) => {
    const sorted = [...initialGoods];

    switch (field) {
      case 'alphabet':
        sorted.sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        sorted.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (reverse) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleSort = field => {
    setSortField(field);
    const sortedGoods = getSortedGoods(field, isReversed);

    setGoods(sortedGoods);
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods(initialGoods);
    setSortField(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort('alphabet')}
          className={`button is-info ${sortField === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort('length')}
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
