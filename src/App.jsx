import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_LENGTH = 'length';

function getPrepearedGoods(goods, { sortField, reverseField }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return goods1.localeCompare(goods2);
        case SORT_LENGTH:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseField })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li data-cy="Good" key={goods}>{goods}</li>
        ))}
      </ul>
    </div>
  );
};
