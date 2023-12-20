import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const ALPHABET = 'by alphabet';
const LENGTH = 'by length';

function getPreparedGoods(goods, { methodSort, reverse }) {
  const copyOfGoods = [...goods];

  if (methodSort) {
    copyOfGoods.sort((good1, good2) => {
      switch (methodSort) {
        case ALPHABET:
          return good1.localeCompare(good2);
        case LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App = () => {
  const [methodSort, setMethodSort] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    methodSort, reverse,
  });

  const sortAndReverse = () => {
    setMethodSort('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': methodSort !== ALPHABET,
          })}
          onClick={() => {
            setMethodSort(ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': methodSort !== LENGTH,
          })}
          onClick={() => {
            setMethodSort(LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(methodSort || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              sortAndReverse();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
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
