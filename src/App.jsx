import 'bulma/css/bulma.css';
import cn from 'classnames';
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

const SORT_FIELD_ALPHA = 'aplha';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getGoods(goods, { sortFIeld, query }) {
  const preparedGoods = [...goods];

  if (sortFIeld) {
    preparedGoods.sort((name1, name2) => {
      switch (sortFIeld) {
        case SORT_FIELD_ALPHA:
          return name1.localeCompare(name2);
        case SORT_FIELD_LENGTH:
          return name1.length - name2.length;

        default:
          return 0;
      }
    });
  }

  if (sortFIeld === SORT_FIELD_REVERSE) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortFIeld, setSortField] = useState('');
  const visibleGoods = getGoods(goodsFromServer, { sortFIeld });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': sortFIeld === '' })}
          onClick={() => setSortField(SORT_FIELD_ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortFIeld === '',
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortFIeld === '',
          })}
          onClick={() => setSortField(SORT_FIELD_REVERSE)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setSortField('')}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
