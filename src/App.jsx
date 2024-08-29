import { useState } from 'react';
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

const SORTING_TYPE_NAME = 'alphabetical';
const SORTING_TYPE_LENGTH = 'length';

function getPreparedGoods(goods, sortingType) {
  const preparedGoods = [...goods];

  if (sortingType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortingType) {
        case SORTING_TYPE_NAME:
          return good1.localeCompare(good2);
        case SORTING_TYPE_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortingType, setSortingType] = useState('');
  let visibleGoods = getPreparedGoods(goodsFromServer, sortingType);
  const [reversedState, setReversedState] = useState(false);

  if (reversedState) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortingType !== SORTING_TYPE_NAME,
          })}
          onClick={() => setSortingType(SORTING_TYPE_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortingType !== SORTING_TYPE_LENGTH,
          })}
          onClick={() => setSortingType(SORTING_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversedState,
          })}
          onClick={() => setReversedState(!reversedState)}
        >
          Reverse
        </button>

        {(sortingType || reversedState) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortingType('');
              setReversedState(false);
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
