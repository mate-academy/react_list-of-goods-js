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

function setOrder(goods, fild, revers) {
  const prepereGoods = [...goods];

  if (fild) {
    prepereGoods.sort((good1, good2) => {
      switch (fild) {
        case SORT_BY_LENGTH:
          return good1[fild] - good2[fild];

        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (revers) {
    prepereGoods.reverse();
  }

  return prepereGoods;
}

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

export const App = () => {
  const [fildOrder, setFildOrder] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visiblGoods = setOrder(goodsFromServer, fildOrder, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': fildOrder !== SORT_BY_ALPHABET,
          })}
          onClick={() => setFildOrder(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': fildOrder !== SORT_BY_LENGTH,
          })}
          onClick={() => setFildOrder(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(fildOrder || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setFildOrder('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiblGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
