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

const ALPHABET = 'alphabet';
const LENGTH = 'length';

function prepareGoods(sort, reverse) {
  const goods = [...goodsFromServer];

  goods.sort((good1, good2) => {
    switch (sort) {
      case ALPHABET:
        return good1.localeCompare(good2);

      case LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sort, setSort] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const newGoods = prepareGoods(sort, isReverse);

  const reset = () => {
    setSort('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort !== ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            setSort(ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort !== LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setSort(LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse ? 'is-light' : ''}`}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>
        {(isReverse || sort) && (
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
        {newGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
