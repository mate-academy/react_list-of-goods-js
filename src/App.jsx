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

const SORT_GOODS_ALPH = 'alphabetically';
const SORT_GOODS_LENGTH = 'length';
const GOODS_REVERSE = 'reverse';

function getPreparedGoods(goods, { sortFilter, reversedGoods }) {
  const preperedGoods = [...goods];

  if (sortFilter) {
    preperedGoods.sort((good1, good2) => {
      switch (sortFilter) {
        case SORT_GOODS_ALPH:
          return good1.localeCompare(good2);

        case SORT_GOODS_LENGTH:
          return good1[sortFilter] - good2[sortFilter];

        default:
          return 0;
      }
    });
  }

  if (reversedGoods) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortFilter, setSortFilter] = useState('');
  const [reversedGoods, setReversedGoods] = useState('');

  const vissibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortFilter, reversedGoods },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFilter !== SORT_GOODS_ALPH },
          )}
          onClick={() => setSortFilter(SORT_GOODS_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFilter !== SORT_GOODS_LENGTH },
          )}
          onClick={() => setSortFilter(SORT_GOODS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': reversedGoods !== GOODS_REVERSE },
          )}
          onClick={() => (
            reversedGoods === '' ? (
              setReversedGoods(GOODS_REVERSE)
            ) : (
              setReversedGoods('')
            )
          )}
        >
          Reverse
        </button>

        { (sortFilter !== '' || reversedGoods !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFilter('');
              setReversedGoods('');
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {vissibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
