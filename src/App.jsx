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

const sortStatus = {
  alphabetically: 'alphabetically',
  length: 'length',
  default: '',
};

function getUpdatedList(goods, statusOfCurrentList, isReversed) {
  let preparedGoods = [...goodsFromServer];

  if (statusOfCurrentList) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (statusOfCurrentList) {
        case sortStatus.alphabetically:
          return good1.localeCompare(good2);
        case sortStatus.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [statusOfCurrentList, setStatusOfCurrentList] = useState(
    sortStatus.default,
  );
  const [isReversed, setIsReversed] = useState(false);
  const showReset = statusOfCurrentList !== sortStatus.default || isReversed;
  const visibleGood = getUpdatedList(
    goodsFromServer,
    statusOfCurrentList,
    isReversed,
  );
  const reset = () => {
    setStatusOfCurrentList(sortStatus.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': statusOfCurrentList !== sortStatus.alphabetically,
          })}
          onClick={() => {
            setStatusOfCurrentList(sortStatus.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': statusOfCurrentList !== sortStatus.length,
          })}
          onClick={() => {
            setStatusOfCurrentList(sortStatus.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
