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
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case handleSortByName:
          return good1.localeCompare(good2);
        case handleSortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (handleReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [handleReverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, handleReverse);
  const isInitialOrder = visibleGoods.length === goodsFromServer.length
  && visibleGoods.every((g, i) => g === goodsFromServer[i])

  function reset() {
    setSortField('');
    setReverse(false);
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
            setReverse(prev => !prev);
          }}
          className={cn('button', 'is-warning', { 'is-light': !handleReverse})}
        >
          Reverse
        </button>

        {(!isInitialOrder) && (
          <button
            type="button"
            onClick={reset}
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
