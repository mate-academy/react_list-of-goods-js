import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

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

function getPreparedGoods(goods, sortType, isReverse) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversedGoods, setIsReversedGoods] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReversedGoods,
  );
  const isResetNeeded = sortType || isReversedGoods;

  const handleResetButton = () => {
    setSortType('');
    setIsReversedGoods(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortType(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversedGoods,
          })}
          onClick={() => setIsReversedGoods(!isReversedGoods)}
        >
          Reverse
        </button>

        {isResetNeeded && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButton}
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
