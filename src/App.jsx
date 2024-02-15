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

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';

function prepareGoods(goods, { sortGoods, isReverse }) {
  const preparedGoods = [...goods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = prepareGoods(goodsFromServer, { sortGoods, isReverse });

  const reset = () => {
    setSortGoods('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortGoods !== SORT_BY_ALPHABET },
          )}
          onClick={() => setSortGoods(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortGoods !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortGoods(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {sortGoods || isReverse
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
          : ''}
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
