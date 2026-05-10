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
  /*
   goods — масив, який ми будемо показувати на сторінці.
   Спочатку він дорівнює початковому масиву.
 */
  const [goods, setGoods] = useState(goodsFromServer);

  /*
    sortType — тип поточного сортування.
    Може бути:
    ''          -> без сортування
    'alphabet'  -> за алфавітом
    'length'    -> за довжиною
  */
  const [sortType, setSortType] = useState('');

  /*
    reversed — чи увімкнено зворотний порядок.
    false -> звичайний порядок
    true  -> зворотний порядок
  */
  const [reversed, setReversed] = useState(false);

  // =========================
  // СОРТУВАННЯ ЗА АЛФАВІТОМ
  // =========================
  const handleSortAlphabetically = () => {
    /*
      [...goodsFromServer]
      створює копію масиву.

      Важливо:
      sort() змінює масив напряму,
      тому не можна сортувати оригінальний масив.
    */
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    /*
      Якщо зараз активний reverse,
      то після сортування треба також
      показати список у зворотному порядку.
    */
    if (reversed) {
      sortedGoods.reverse();
    }

    // Оновлюємо товари
    setGoods(sortedGoods);

    // Запам'ятовуємо активне сортування
    setSortType('alphabet');
  };

  // =========================
  // СОРТУВАННЯ ЗА ДОВЖИНОЮ
  // =========================
  const handleSortByLength = () => {
    /*
      a.length - b.length

      Якщо результат < 0:
      a буде раніше

      Якщо результат > 0:
      b буде раніше
    */
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    // Якщо reverse активний — перевертаємо
    if (reversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType('length');
  };

  // =========================
  // REVERSE
  // =========================
  const handleReverse = () => {
    /*
      Створюємо копію поточного масиву
      і перевертаємо його.
    */
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);

    /*
      !reversed
      перемикає:
      false -> true
      true -> false
    */
    setReversed(!reversed);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    // Повертаємо початковий масив
    setGoods(goodsFromServer);

    // Скидаємо всі режими
    setSortType('');
    setReversed(false);
  };

  /*
    Перевіряємо:
    чи список зараз у початковому стані.

    JSON.stringify() перетворює масив у рядок,
    щоб можна було легко порівняти масиви.
  */
  const isDefaultOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        {/* =========================
            SORT ALPHABETICALLY
           ========================= */}

        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={`
            button is-info
            ${sortType !== 'alphabet' ? 'is-light' : ''}
          `}
        >
          Sort alphabetically
        </button>

        {/* =========================
            SORT BY LENGTH
           ========================= */}

        <button
          type="button"
          onClick={handleSortByLength}
          className={`
            button is-success
            ${sortType !== 'length' ? 'is-light' : ''}
          `}
        >
          Sort by length
        </button>

        {/* =========================
            REVERSE
           ========================= */}

        <button
          type="button"
          onClick={handleReverse}
          className={`
            button is-warning
            ${!reversed ? 'is-light' : ''}
          `}
        >
          Reverse
        </button>

        {/* =========================
            RESET
           ========================= */}

        {!isDefaultOrder && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      {/* =========================
          СПИСОК ТОВАРІВ
         ========================= */}

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
