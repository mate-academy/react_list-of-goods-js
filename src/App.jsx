import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

function sortBy(goods, sortingElem, shape) {
  const prepearGoods = [...goods];

  if (sortingElem) {
    prepearGoods.sort((good1, good2) => {
      switch (sortingElem) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return shape ? prepearGoods.toReversed() : prepearGoods;
}

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = sortBy(goodsFromServer, sortedGoods, reverse);
  const haveReset = reverse || sortedGoods;

  function hendleReset() {
    setSortedGoods('');
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortedGoods !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortedGoods(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortedGoods !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortedGoods(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {haveReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={hendleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
