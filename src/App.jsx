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

const SORTED_ALPHABETICALLY = 'alphabetically';
const SORTED_BY_LENGTH = 'length';

function getGoodsSorted(goods, sortedGoods, isGoodReversed) {
  const copyGoods = [...goodsFromServer];

  if (sortedGoods) {
    copyGoods.sort((good1, good2) => {
      switch (sortedGoods) {
        case SORTED_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORTED_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isGoodReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState('');
  const [isGoodReversed, setIsGoodReversed] = useState(false);
  const sorted = getGoodsSorted(
    goodsFromServer,
    sortedGoods,
    isGoodReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortedGoods !== SORTED_ALPHABETICALLY },
          )}
          onClick={() => setSortedGoods(SORTED_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortedGoods !== SORTED_BY_LENGTH },
          )}
          onClick={() => setSortedGoods(SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isGoodReversed },
          )}
          onClick={() => setIsGoodReversed(!isGoodReversed)}
        >
          Reverse
        </button>

        {(sortedGoods || isGoodReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsGoodReversed(false);
                setSortedGoods('');
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sorted.map(good => (
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
