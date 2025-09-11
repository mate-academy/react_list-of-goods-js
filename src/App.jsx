import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
const handleSortByName = 'Sort alphabetically';
const handleSortByLength = 'Sort by length';

function getPreparedGoods(goods, sortField, handleReverse = false) {
  let prepearedGoods = [...goods];

  if (sortField) {
    if (sortField === handleSortByName) {
    prepearedGoods.sort((good1, good2) => good1.localeCompare(good2));

    } else if (sortField === handleSortByLength) {
      const decoratedGoods = prepearedGoods.map((value, index) => ({ value, index }));

      decoratedGoods.sort((a, b) => {
        const lengthDiff = a.value.length - b.value.length;
        if (lengthDiff !== 0) {
          return lengthDiff;
        }

        return a.index - b.index;
      });

      prepearedGoods = decoratedGoods.map(item => item.value);
    }
  }

  if (handleReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [handleReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    handleReverse,
  );
  const isInitialOrder =
    visibleGoods.length === goodsFromServer.length &&
    visibleGoods.every((g, i) => g === goodsFromServer[i]);

  function handleReset() {
    setSortField('');
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(handleSortByName);
          }}
          className={cn('button', 'is-info', {
            'is-light': sortField !== handleSortByName,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortField(handleSortByLength);
          }}
          className={cn('button', 'is-success', {
            'is-light': sortField !== handleSortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
           setIsReverse(prev => !prev);
          }}
          className={cn('button', 'is-warning', { 'is-light': !handleReverse })}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
