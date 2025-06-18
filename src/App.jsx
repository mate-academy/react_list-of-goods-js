import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const SORT_FILET_LENGTH = 'length';
const SORT_FILET_ALPHABERICALLY = 'alphabetically';
const SORT_FILET_RESET = 'Reset';

function getPreparedGoods(goods, { sortFild, isReversed }) {
  let prerearedGoods = [...goods];

  if (sortFild === SORT_FILET_LENGTH) {
    prerearedGoods = prerearedGoods.sort(
      (good1, good2) => good1.length - good2.length,
    );
  }

  if (sortFild === SORT_FILET_ALPHABERICALLY) {
    prerearedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortFild === SORT_FILET_RESET) {
    prerearedGoods = goods;
  }

  if (isReversed) {
    prerearedGoods.reverse();
  }

  return prerearedGoods;
}

export const App = () => {
  const [sortFild, setSortFiled] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortFild,
    isReversed,
  });

  const reversClick = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortFiled(SORT_FILET_ALPHABERICALLY)}
          className={cn('button is-info', {
            'is-light': sortFild !== SORT_FILET_ALPHABERICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortFiled(SORT_FILET_LENGTH)}
          className={cn('button is-success', {
            'is-light': sortFild !== SORT_FILET_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => {
            reversClick();
          }}
        >
          Reverse
        </button>

        {sortFild || isReversed !== false ? (
          <button
            type="button"
            onClick={() => {
              setSortFiled('');
              setIsReversed(false);
            }}
            className={cn('button is-danger', {
              'is-light': sortFild !== SORT_FILET_RESET,
            })}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
