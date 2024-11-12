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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  // Сортировка списка товаров
  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'sortAlphabetically':
        return good1.localeCompare(good2);
      case 'sortLength':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  // Применение реверса
  if (reversed) {
    visibleGoods.reverse();
  }

  // Функция сброса
  const resetGoods = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === 'sortAlphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField('sortAlphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === 'sortLength'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField('sortLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
