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

// Функція сортування
const getPreparedGoods = (sortField, isReversed) => {
  let prepGoods = [...goodsFromServer];

  switch (sortField) {
    case 'is-info':
      prepGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'is-success':
      prepGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    prepGoods.reverse();
  }

  return prepGoods;
};

// Функція для порівняння масивів
const isSameArray = (a, b) =>
  a.length === b.length && a.every((val, i) => val === b[i]);

export const App = () => {
  const [activeButton, setActiveButton] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isResetVisible, setIsResetVisible] = useState(false);

  // Оновлення товарів з урахуванням сортування + реверсу
  const updateGoods = (sortType = activeButton, reverse = isReversed) => {
    const sorted = getPreparedGoods(sortType, reverse);
    setGoods(sorted);
    setIsResetVisible(!isSameArray(sorted, goodsFromServer));
  };

  const handleSort = (sortType) => {
    setActiveButton(sortType);
    updateGoods(sortType, isReversed);
  };

  const handleReverse = () => {
    const newReversed = !isReversed;
    setIsReversed(newReversed);
    updateGoods(activeButton, newReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setActiveButton('');
    setIsReversed(false);
    setIsResetVisible(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort('is-info')}
          type="button"
          className={`button is-info ${activeButton !== 'is-info' ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort('is-success')}
          type="button"
          className={`button is-success ${activeButton !== 'is-success' ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
