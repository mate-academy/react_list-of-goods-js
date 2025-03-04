import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

function getPreparedGoods(goods, sortField, isReverse) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case 'alphabetically':
          return goods1.localeCompare(goods2);
        case 'length':
          return goods1.length - goods2.length;
        case 'reverse':
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => {
            setSortField('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => {
            setSortField('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => {
            setReverse(!isReverse);
          }}
        >
          Reverse
        </button>
        {(isReverse || sortField) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
