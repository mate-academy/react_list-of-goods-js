import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [items, setItems] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [initialItems] = useState(goodsFromServer);

  function sortByAlphabet() {
    if (sortType === SORT_BY_ALPHABET) {
      // Якщо вже сортували по алфавіту, повертаємо в початковий порядок
      setItems(initialItems);
      setSortType('');
    } else {
      // Сортуємо по алфавіту
      const sortedItems = [...items].sort((a, b) => a.localeCompare(b));

      // Оновлення стану items на новий відсортований масив sortedItems
      setItems(sortedItems);
      setSortType(SORT_BY_ALPHABET);
    }

    setIsReversed(false);
  }

  function sortByLength() {
    if (sortType === SORT_BY_LENGTH) {
      // Якщо сортували по довжині, повертаємо в початковий порядок
      setItems(initialItems);
      setSortType('');
    } else {
      // Сортуємо по довжині
      const sortedItems = [...items].sort(
        (good1, good2) => good1.length - good2.length,
      );

      // Оновлення стану items на новий відсортований масив sortedItems
      setItems(sortedItems);
      setSortType(SORT_BY_LENGTH);
    }

    setIsReversed(false);
  }

  const reset = () => {
    setItems(initialItems);
    setSortType('');
    setIsReversed(false);
  };

  const reverseGoods = () => {
    const reversedGoods = [...items].reverse();

    setItems(reversedGoods);
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SORT_BY_ALPHABET || isReversed,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH || isReversed,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {items.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
