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
const SORT_BY_REVERSE = 'reverse';

function getPreparedGood(goods, sortField, revers) {
  const visibleGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_BY_ALPHABETICALLY:
        if (revers) {
          visibleGoods.sort((good1, good2) => good2.localeCompare(good1));
        } else {
          visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
        }
        break;
      case SORT_BY_LENGTH:
        if (revers) {
          visibleGoods.sort((good1, good2) => (
            good2.length - good1.length))
        } else {
          visibleGoods.sort((good1, good2) => (
            good1.length - good2.length))
        }
        break;
      case SORT_BY_REVERSE:
        visibleGoods.reverse();
        break;
      default:
        break;
    }
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [reverse, setReverse] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const copyVisibleGoods = [...visibleGoods];

  const sortByAlphabeticaly = () => {
    setSortField(SORT_BY_ALPHABETICALLY);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_ALPHABETICALLY, reverse),
    );
    setIsReset(true);
  };

  const sortByLength = () => {
    setSortField(SORT_BY_LENGTH);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_LENGTH, reverse),
    );
    setIsReset(true);
  };

  const sortByReverse = () => {
    setReverse(!reverse);
    setVisibleGoods(getPreparedGood(visibleGoods, SORT_BY_REVERSE, !reverse));
    setIsReset(
      JSON.stringify(copyVisibleGoods.reverse())
      !== JSON.stringify(goodsFromServer),
    );
  };

  const resetGoods = () => {
    setSortField('');
    setVisibleGoods(goodsFromServer);
    setReverse(false);
    setIsReset(false);
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
            'is-light': !reverse,
          })}
          onClick={sortByReverse}
        >
          Reverse
        </button>

        {isReset && (
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
