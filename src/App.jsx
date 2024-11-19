import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classnames from 'classnames';
import { GoodList } from './GoodList';

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

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

function sortItems(goods, { sortType, queue }) {
  const items = [...goods];

  if (sortType) {
    items.sort((a, b) => {
      switch (sortType) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (queue) {
    items.reverse();
  }

  return items;
}

export const App = () => {
  const [queueField, setQueueField] = useState(false); // Булеве значення
  const [sortField, setSortField] = useState('');
  const visibleGoods = sortItems(goodsFromServer, {
    sortType: sortField,
    queue: queueField,
  });

  const isResetVisible = sortField || queueField;

  return (
    <div className="section content">
      <div className="buttons">
        {/* Кнопка сортування за алфавітом */}
        <button
          type="button"
          className={classnames('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning', {
            'is-light': !queueField, // Активний стан, якщо queueField = false
          })}
          onClick={() => setQueueField((prev) => !prev)} // Інвертуємо значення
        >
          Reverse
        </button>

        {/* Кнопка Reset */}
        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(''); // Скидаємо поле сортування
              setQueueField(false); // Повертаємо початковий стан
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
