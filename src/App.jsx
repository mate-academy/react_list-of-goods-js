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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function sortGoods(goods, query) {
  const prepearedGoods = [...goods];

  prepearedGoods.sort((good1, good2) => {
    switch (query) {
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;

      case SORT_FIELD_NAME:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setRevers] = useState('');
  const visibleGoods = sortGoods(goodsFromServer, sortField);

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': reverse !== 'reverse' })}
          onClick={() => {
            if (reverse) {
              setRevers('');
            } else {
              setRevers('reverse');
            }
          }}
        >
          Reverse
        </button>

        {(sortField || reverse)
        && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortField('');
            setRevers('');
          }}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
