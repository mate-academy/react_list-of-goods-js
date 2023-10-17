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

const SORT_BY_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_BY_REVERSE = 'isReversed';

function getPreparedGood(goods, sortField, isReversed) {
  const visibleGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_BY_ALPHABETICALLY:
        if (isReversed) {
          visibleGoods.sort((good1, good2) => good2.localeCompare(good1));
        } else {
          visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
        }

        break;
      case SORT_BY_LENGTH:
        if (isReversed) {
          visibleGoods.sort((good1, good2) => (
            good2.length - good1.length));
        } else {
          visibleGoods.sort((good1, good2) => (
            good1.length - good2.length));
        }

        break;
      default:
        break;
    }
  }

  if (sortField === SORT_BY_REVERSE) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabeticaly = () => {
    setSortField(SORT_BY_ALPHABETICALLY);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_ALPHABETICALLY, isReversed),
    );
  };

  const sortByLength = () => {
    setSortField(SORT_BY_LENGTH);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_LENGTH, isReversed),
    );
  };

  const sortByReverse = () => {
    setIsReversed(!isReversed);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_REVERSE, !isReversed)
    );
  };

  const resetGoods = () => {
    setSortField('');
    setVisibleGoods(goodsFromServer);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABETICALLY,
          })}
          onClick={sortByAlphabeticaly}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={sortByReverse}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods)
          !== JSON.stringify(goodsFromServer) && (
            <button
              type="button"
              className={cn('button is-danger', {
                'is-light': sortField !== '',
              })}
              onClick={resetGoods}
            >
              Reset
            </button>
          )}
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
