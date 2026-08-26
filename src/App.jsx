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

const ASCENDING_SORT = 'ASC sort';
const LENGTH_SORT = 'LENGTH sort';
const NOT_REVERSED = 'NOT REVERSED sort';
const REVERSE_SORT = 'REVERSE sort';

function getPreparedGoods(selectedSort, reverseState) {
  const goods = [...goodsFromServer];

  switch (selectedSort) {
    case ASCENDING_SORT:
      goods.sort((good1, good2) => good1.localeCompare(good2));

      break;

    case LENGTH_SORT:
      goods.sort((good1, good2) => good1.length - good2.length);

      break;

    default:
      break;
  }

  if (reverseState === REVERSE_SORT) {
    return goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [selectedSort, setSelectedSort] = useState('');
  const [reverseState, setReverseState] = useState(NOT_REVERSED);

  const goods = getPreparedGoods(selectedSort, reverseState);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSelectedSort(ASCENDING_SORT);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': selectedSort !== ASCENDING_SORT,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSelectedSort(LENGTH_SORT);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': selectedSort !== LENGTH_SORT,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            const reverseSortValue =
              reverseState === NOT_REVERSED ? REVERSE_SORT : NOT_REVERSED;

            setReverseState(reverseSortValue);
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseState === NOT_REVERSED,
          })}
        >
          Reverse
        </button>

        {!(selectedSort === '' && reverseState === NOT_REVERSED) && (
          <button
            onClick={() => {
              setSelectedSort('');
              setReverseState(NOT_REVERSED);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
