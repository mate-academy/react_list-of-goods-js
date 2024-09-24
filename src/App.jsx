import React, { useState } from 'react';
import cn from 'classname';

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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function sortingAndReversing(array, sortType, isReverse) {
  const arrayCopy = [...array];

  switch (sortType) {
    case SORT_BY_NAME:
      arrayCopy.sort((goods1, goods2) => goods1.localeCompare(goods2));
      break;
    case SORT_BY_LENGTH:
      arrayCopy.sort((goods1, goods2) => goods1.length - goods2.length);
      break;

    default:
      break;
  }

  if (isReverse) {
    arrayCopy.reverse();
  }

  return arrayCopy;
}

export function App() {
  const [sortType, setSortType] = useState('');
  const [reverseCondition, setReverseCondition] = useState(false);

  const goodsSorted = sortingAndReversing(
    goodsFromServer,
    sortType,
    reverseCondition,
  );

  function setResets() {
    setSortType('');
    setReverseCondition(false);
  }

  const handleIsReverse = () =>
    reverseCondition ? setReverseCondition(false) : setReverseCondition(true);

  const hasNoSortParameters = !sortType && !reverseCondition;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_BY_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_BY_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleIsReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseCondition,
          })}
        >
          Reverse
        </button>

        {!hasNoSortParameters && (
          <button
            onClick={setResets}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsSorted.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}
