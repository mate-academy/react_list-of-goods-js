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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';
const SORT_REVERSE = 'reverse';

function sortGoods(goods, isLight, isReverse) {
  let preparedGoods = [...goods];

  if (isLight) {
    preparedGoods.sort((good1, good2) => {
      switch (isLight) {
        case SORT_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isLight, setIsLight] = useState('');
  const [isReverse, setIsReverse] = useState('');
  const visibleGoods = sortGoods(goodsFromServer, isLight, isReverse);

  const reverse = () => {
    if (isReverse) {
      setIsReverse('');
    } else {
      setIsReverse(SORT_REVERSE);
    }
  };

  const reset = () => {
    setIsLight('');
    setIsReverse('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': isLight !== SORT_ALPHABET,
          })}
          onClick={() => setIsLight(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': isLight !== SORT_LENGTH,
          })}
          onClick={() => setIsLight(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReverse !== SORT_REVERSE,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isLight || isReverse) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
