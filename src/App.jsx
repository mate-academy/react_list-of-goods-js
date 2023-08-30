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
const SORT_BY_LENGHT = 'length';
const SORT_BY_ALPHABET = 'alphabet';

function getPreperedGood(goods, sortGoods, isReversedGoods) {
  const preperedGood = [...goods];

  if (sortGoods) {
    preperedGood.sort((a, b) => {
      switch (sortGoods) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);
        case SORT_BY_LENGHT:
          return a[sortGoods] - b[sortGoods];
        default:
          return 0;
      }
    });
  }

  if (isReversedGoods) {
    preperedGood.reverse();
  }

  return preperedGood;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversedGoods, setIsRevesedGoods] = useState(false);
  const sortedGoods = getPreperedGood(
    goodsFromServer,
    sortField,
    isReversedGoods,
  );

  const isSortedByLength = sortField !== SORT_BY_LENGHT;
  const isSortedByAlphabetically = sortField !== SORT_BY_ALPHABET;

  function resetButton() {
    setIsRevesedGoods(false);
    setSortField('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': isSortedByAlphabetically },
          )}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': isSortedByLength },
          )}
          onClick={() => setSortField(SORT_BY_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversedGoods },
          )}
          onClick={() => setIsRevesedGoods(!isReversedGoods)}
        >
          Reverse
        </button>
        {(sortField || isReversedGoods)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetButton}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map(good => (
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
