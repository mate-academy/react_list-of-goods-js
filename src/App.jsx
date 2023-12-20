import 'bulma/css/bulma.css';
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
  const [reset, setReset] = useState(false);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { methodSort, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={methodSort === ALPHABET
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => {
            setMethodSort(ALPHABET);
            setReset(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={methodSort === LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => {
            setMethodSort(LENGTH);
            setReset(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverse
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => {
            setReset(true);
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReset(false);
              setMethodSort('');
              setReverse(false);
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
