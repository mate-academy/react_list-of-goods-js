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

// фція приймає окремо тип сортування та булевий реверс
function prepareGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  // 1. Спочатку виконуємо основне сортування
  if (sortField === 'alphabet') {
    preparedGoods.sort((a, b) => a.localeCompare(b)); // Використовуємо localeCompare для надійності
  } else if (sortField === 'length') {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  // 2. Потім, якщо активовано реверс, перевертаємо вже відсортований (або початковий) масив
  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  // Стан для вибору типу сортування (алфавіт або довжина)
  const [sortType, setSortType] = useState('');
  // Окремий стан для реверсу (так вони працюватимуть одночасно)
  const [isReversed, setIsReversed] = useState(false);

  // Готуємо список, передаючи обидва параметри стану
  const preparedGoods = prepareGoods(goodsFromServer, sortType, isReversed);

  // Функція для скидання всього до початкового стану
  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortType('alphabet')} // Встановлюємо тип "алфавіт"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortType('length')} // Встановлюємо тип "довжина"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)} // Перемикаємо true/false (туди-сюди)
        >
          Reverse
        </button>

        {/* Reset показуємо тільки якщо щось змінено (ТЗ: сортування або реверс) */}
        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset} // Викликаємо функцію скидання
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
