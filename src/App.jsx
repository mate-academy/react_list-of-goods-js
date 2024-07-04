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
const SORT_FIELD_LENGHT = 'length';
const SORT_FIELD_REVERSE = 'reverse';
const NOT_ACTIVE_CLASS = 'is-light';

function getPreperetGoods(goods, { sortField, reversSort }) {
  let preperetGoods = [...goods];

  if (sortField) {
    preperetGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return goods1.localeCompare(goods2);
        case SORT_FIELD_LENGHT:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (reversSort) {
    preperetGoods.reverse();
  }

  return preperetGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversSort, setReversSort] = useState('');
  const visibleGoods = getPreperetGoods(goodsFromServer, {
    sortField,
    reversSort,
  });

  const reset = () => {
    setSortField('');
    setReversSort('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            sortField !== SORT_FIELD_ALPHABET && NOT_ACTIVE_CLASS,
          )}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            sortField !== SORT_FIELD_LENGHT && NOT_ACTIVE_CLASS,
          )}
          onClick={() => setSortField(SORT_FIELD_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', !reversSort && NOT_ACTIVE_CLASS)}
          onClick={() =>
            reversSort === ''
              ? setReversSort(SORT_FIELD_REVERSE)
              : setReversSort('')
          }
        >
          Reverse
        </button>

        {(sortField || reversSort) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
