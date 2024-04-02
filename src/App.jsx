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

function getPreparedGoods(goods, isLight, isReversed) {
  let preparedGoods = [...goods];

  if (isLight) {
    preparedGoods.sort((item1, item2) => {
      switch (isLight) {
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
  const [isLight, setIsLight] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, isLight, isReversed);

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsLight('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': isLight !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setIsLight(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': isLight !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setIsLight(SORT_FIELD_LENGTH)}
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

        {(isLight || isReversed) && (
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
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
