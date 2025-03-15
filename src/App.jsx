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

const SORT_BY_ALPHABET = 'alph';
const SORT_BY_LENGTH = 'len';

function prepareGoods(goods, sortField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SORT_BY_ALPHABET) {
        return good1.localeCompare(good2);
      }

      if (sortField === SORT_BY_LENGTH) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  return preparedGoods;
}

export const App = () => {
  const copyOfOriginGoods = [...goodsFromServer];
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = prepareGoods(copyOfOriginGoods, sortField);

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goodName => (
          <li data-cy="Good" key={goodName}>
            {goodName}
          </li>
        ))}
      </ul>
    </div>
  );
};
