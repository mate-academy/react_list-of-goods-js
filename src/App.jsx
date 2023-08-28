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

const GOOD_BY_LENGTH = 'length';
const GOOD_BY_NAME = 'alphabetically';

function getPreperedGoods(goods, sortGoods, isReverseGoods) {
  const preperedGoods = [...goods];

  if (sortGoods) {
    preperedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case GOOD_BY_LENGTH:
          return good1.length - good2.length;
        case GOOD_BY_NAME:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReverseGoods) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [isReverseGoods, setIsReversedGoods] = useState(false);
  const sortedGoods = getPreperedGoods(
    goodsFromServer,
    sortGoods,
    isReverseGoods,
  );

  const isSortByLength = sortGoods !== GOOD_BY_LENGTH;
  const isSortByName = sortGoods !== GOOD_BY_NAME;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': isSortByName },
          )}
          onClick={() => setSortGoods(GOOD_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': isSortByLength },
          )}
          onClick={() => setSortGoods(GOOD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReverseGoods },
          )}
          onClick={() => setIsReversedGoods(!isReverseGoods)}
        >
          Reverse
        </button>
        {(sortGoods || isReverseGoods)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversedGoods(false);
              setSortGoods('');
            }}
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
