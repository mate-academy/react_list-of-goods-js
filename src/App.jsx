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

const ALPHABET = 'Alphabet';
const LENGTH = 'Length';

function getPreparedGoods(goods, sortFiled, isReversed) {
  const preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case ALPHABET:
          return good1.localeCompare(good2);

        case LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortFiled, setSortFiled] = useState('');
  const [isReversed, setReverse] = useState(false);

  let visibleGoods = getPreparedGoods(goodsFromServer, sortFiled, isReversed);

  function reverseSort() {
    [...visibleGoods].reverse();
    if (!isReversed) {
      setReverse(true);
    } else {
      setReverse(false);
    }
  }

  function reset() {
    visibleGoods = goodsFromServer;
    setSortFiled('');
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortFiled(ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFiled !== ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortFiled(LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFiled !== LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverseSort}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(sortFiled || isReversed)
        && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )
        }
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
