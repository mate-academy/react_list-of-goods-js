import React, { useState } from 'react';
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
  // Зберігаємо оригінальний порядок товарів
  const originalGoods = [...goodsFromServer];

  // Стан для відображення товарів
  const [goods, setGoods] = useState(originalGoods);

  // Стан для відстеження активних фільтрів
  const [activeFilters, setActiveFilters] = useState({
    alphabetical: false,
    byLength: false,
    reversed: false,
  });

  // Перевірка, чи товари в оригінальному порядку
  const determineOriginalOrder = () => {
    return goods.every((good, index) => good === originalGoods[index]);
  };

  // Сортування за алфавітом
  const sortAlphabetically = () => {
    // Створюємо новий масив товарів, завжди сортуємо його за алфавітом
    let newGoods = [...originalGoods].sort((a, b) => a.localeCompare(b));

    // Якщо активний режим реверсу, перевертаємо відсортований масив
    if (activeFilters.reversed) {
      newGoods = newGoods.reverse();
    }

    setGoods(newGoods);
    setActiveFilters({
      alphabetical: true,
      byLength: false,
      reversed: activeFilters.reversed,
    });
  };

  // Сортування за довжиною
  const sortByLength = () => {
    // Створюємо новий масив товарів, завжди сортуємо його за довжиною
    let newGoods = [...originalGoods].sort((a, b) => a.length - b.length);

    // Якщо активний режим реверсу, перевертаємо відсортований масив
    if (activeFilters.reversed) {
      newGoods = newGoods.reverse();
    }

    setGoods(newGoods);
    setActiveFilters({
      alphabetical: false,
      byLength: true,
      reversed: activeFilters.reversed,
    });
  };

  // Зміна порядку на протилежний
  const reverseOrder = () => {
    const newGoods = [...goods].reverse();

    // Якщо після реверсу порядок співпадає з оригінальним, скидаємо всі фільтри
    if (newGoods.every((good, index) => good === originalGoods[index])) {
      setGoods(newGoods);
      setActiveFilters({
        alphabetical: false,
        byLength: false,
        reversed: false,
      });
    } else {
      setGoods(newGoods);
      setActiveFilters({
        alphabetical: activeFilters.alphabetical,
        byLength: activeFilters.byLength,
        reversed: true,
      });
    }
  };

  // Скидання до оригінального порядку
  const resetOrder = () => {
    setGoods([...originalGoods]);
    setActiveFilters({
      alphabetical: false,
      byLength: false,
      reversed: false,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeFilters.alphabetical ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeFilters.byLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeFilters.reversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {!determineOriginalOrder() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
