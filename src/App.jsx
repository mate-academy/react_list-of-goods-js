import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

const initialGoods = [
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
  const [isReversed, setIsReversed] = useState(false);

  // 1. Копіюємо масив для сортування
  let visibleGoods = [...initialGoods];

  // 2. Застосовуємо сортування
  if (sortField === 'alphabetically') {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === 'length') {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  // 3. Застосовуємо реверс, якщо він увімкнений
  if (isReversed) {
    visibleGoods.reverse();
  }

  const isModified = sortField !== '' || isReversed;

  const resetAll = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">React List of Goods</h1>

        {/* Кнопки керування */}
        <div className="buttons are-medium mb-5">
          <button
            type="button"
            className={classNames('button', 'is-primary', {
              'is-light': sortField !== 'alphabetically',
            })}
            onClick={() => setSortField('alphabetically')}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames('button', 'is-primary', {
              'is-light': sortField !== 'length',
            })}
            onClick={() => setSortField('length')}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames('button', 'is-info', {
              'is-light': !isReversed,
            })}
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          {isModified && (
            <button
              type="button"
              className="button is-danger"
              onClick={resetAll}
            >
              Reset
            </button>
          )}
        </div>

        {/* Таблиця товарів із правильними data-cy атрибутами */}
        <table className="table is-fullwidth">
          <tbody>
            {visibleGoods.map(good => (
              <tr key={good} data-cy="Good">
                <td data-cy="GoodTitle" className="is-vcentered">
                  {good}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;