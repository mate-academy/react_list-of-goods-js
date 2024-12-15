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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getSortedGoods(goods, sortGoods, isReversed) {
  const preparedGoods = [...goods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
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
  const [sortGoods, setSortGoods] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, sortGoods, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortGoods(SORT_ALPHABETICALLY);
            setIsReversed(false);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortGoods !== SORT_ALPHABETICALLY || isReversed,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortGoods(SORT_BY_LENGTH);
            setIsReversed(false);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortGoods !== SORT_BY_LENGTH || isReversed,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortGoods !== '' || isReversed) && (
          <button
            onClick={() => {
              setSortGoods('');
              setIsReversed(false);
            }}
            type="button"
            className={cn('button is-danger', {
              'is-light': sortGoods !== '' || isReversed,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
