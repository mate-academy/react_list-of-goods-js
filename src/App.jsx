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

const SORT_BY_ALPHABET = 'Alpabet';
const SORT_BY_LENGTH = 'Length';

function getSortMethod(goodsArray, { sortField, reverseMethod = false }) {
  const prepareGoods = [...goodsArray];

  if (sortField) {
    prepareGoods.sort((arg1, arg2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return arg1.localeCompare(arg2);
        case SORT_BY_LENGTH:
          return arg1.length - arg2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseMethod) {
    return prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSorted] = useState('');
  const [isReversed, setReverseMethod] = useState(false);

  const visibleGoods = getSortMethod(goodsFromServer, {
    sortField,
    reverseMethod: isReversed,
  });

  const resetMain = () => {
    setSorted('');
    setReverseMethod(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSorted(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSorted(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverseMethod(!isReversed)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetMain}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(values => {
          return (
            <li data-cy="Good" key={values}>
              {values}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
