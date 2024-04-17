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

const SORT_GOOD_ALPHABETICALLY = 'ALPHABET';
const SORT_GOOD_LENGTH = 'LENGTH';

function getPreparedGoods(goods, { sortField, reverse }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortField) {
        case SORT_GOOD_ALPHABETICALLY:
          return firstGood.localeCompare(secondGood);
        case SORT_GOOD_LENGTH:
          return firstGood.length - secondGood.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_GOOD_ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_GOOD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_GOOD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_GOOD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(reverse || sortField) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
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
