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

const sortByLength = 'length';
const sortByABC = 'abc';

const getSortGoods = (goods, sortField, isReversed) => {
  const preparedList = [...goods];

  if (sortField) {
    preparedList.sort((a, b) => {
      switch (sortField) {
        case sortByLength:
          return a.length - b.length;
        case sortByABC:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedList.reverse();
  }

  return preparedList;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const finalGoods = getSortGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== sortByABC,
          })}
          onClick={() => {
            setSortField(sortByABC);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== sortByLength,
          })}
          onClick={() => {
            setSortField(sortByLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {finalGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
