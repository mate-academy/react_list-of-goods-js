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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function preparedGoodsData(goods, sortValue, isReversed) {
  const preparedData = [...goods];

  if (sortValue) {
    preparedData.sort((good1, good2) => {
      switch (sortValue) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedData.reverse();
  }

  return preparedData;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReversed, setReversed] = useState(false);

  const visibleGoods = preparedGoodsData(
    goodsFromServer,
    sortValue,
    isReversed,
  );

  const sortState = sortValue || isReversed;

  function handleReverse() {
    setReversed(yes => !yes);
  }

  function handleReset() {
    setSortValue('');
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortValue(SORT_BY_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortValue !== SORT_BY_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortValue(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortValue !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse()}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sortState && (
          <button
            onClick={() => handleReset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
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
