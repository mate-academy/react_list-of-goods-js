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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_NONE = '';

function getPreparedGoods(goods, sortedBy, isReversed) {
  let preparedGoods = [...goods];

  if (sortedBy) {
    preparedGoods.sort((item1, item2) => {
      switch (sortedBy) {
        case SORT_FIELD_ALPHABET:
          return item1.localeCompare(item2);

        case SORT_FIELD_LENGTH:
          return item1.length - item2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortedBy, setSortedBy] = useState(SORT_FIELD_NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortedBy, isReversed);

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortedBy !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortedBy(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortedBy !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortedBy(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed ? '' : 'is-light',
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortedBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedBy(SORT_FIELD_NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
