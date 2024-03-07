/* eslint-disable prettier/prettier */
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getSortedGoods(goods, { sortField, isReverse }) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, { sortField, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button': true,
            'is-info': true,
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button': true,
            'is-success': true,
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button': true,
            'is-warning': true,
            'is-light': !isReverse,
          })}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>
        {
          (isReverse || sortField) && (
          <button
            type="button"
            className='button is-danger is-light'
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
        >
          Reset
        </button>
          )
        }
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
