import { useMemo, useState } from 'react';
import classNames from 'classnames';
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

const SORT_TYPES = {
  alphabetically: 'alphabetically',
  byLength: 'byLength',
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const reorderedGoods = [...goodsFromServer];

    if (sortType === SORT_TYPES.alphabetically) {
      reorderedGoods.sort((firstGood, secondGood) => {
        return firstGood.localeCompare(secondGood);
      });
    }

    if (sortType === SORT_TYPES.byLength) {
      reorderedGoods.sort(
        (firstGood, secondGood) => firstGood.length - secondGood.length,
      );
    }

    if (isReversed) {
      reorderedGoods.reverse();
    }

    return reorderedGoods;
  }, [sortType, isReversed]);

  const isDefaultOrder = sortType === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SORT_TYPES.alphabetically,
          })}
          onClick={() => setSortType(SORT_TYPES.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SORT_TYPES.byLength,
          })}
          onClick={() => setSortType(SORT_TYPES.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(currentValue => !currentValue)}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
