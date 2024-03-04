import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FILED_ALPHABET = 'alphabet';
const SORT_FILED_LENGT = 'length';

function getPrepareGoods(goods, { sortField, reverse }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FILED_LENGT:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return prepearedGoods.reverse();
  }

  if (sortField && reverse) {
    return (prepearedGoods = [...goods]);
  }

  return prepearedGoods;
}

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState('');
  const visibleGoods = getPrepareGoods(goodsFromServer, { sortField, reverse });

  const fnReset = () => {
    setSortField('');
    setReverse('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FILED_ALPHABET)}
          type="button"
          className={cn({
            'is-light': sortField !== SORT_FILED_ALPHABET,
            button: true,
            'is-info': true,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FILED_LENGT)}
          type="button"
          className={cn({
            'is-light': sortField !== SORT_FILED_LENGT,
            button: true,
            'is-success': true,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn({
            'is-light': !reverse,
            button: true,
            'is-warning': true,
          })}
        >
          Reverse
        </button>

        {(reverse || sortField) && (
          <button
            onClick={fnReset}
            type="button"
            className={cn({
              'is-light': !sortField,
              button: true,
              'is-danger ': true,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
