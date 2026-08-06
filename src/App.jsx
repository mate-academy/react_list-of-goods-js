import cn from 'classnames';
import { useState } from 'react';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function sortGoodsBy(goods, sortingType) {
  const sameGoods = [...goods];

  switch (sortingType) {
    case SORT_BY_ALPHABET:
      return sameGoods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });

    case SORT_BY_LENGTH:
      return sameGoods.sort((good1, good2) => {
        return good1.length - good2.length;
      });

    default:
      return goods;
  }
}

// eslint-disable-next-line no-fallthrough
export const App = () => {
  const [currentSorting, setCurrentSorting] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  let goodsList = sortGoodsBy(goodsFromServer, currentSorting);

  if (isReversed) {
    goodsList = [...goodsList].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': currentSorting !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setCurrentSorting(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': currentSorting !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setCurrentSorting(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(currentSorting || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setCurrentSorting('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
