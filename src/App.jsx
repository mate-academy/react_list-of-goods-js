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
const REVERSE = 'reverse';
let isSortParametersNull;

export function App() {
  const goodsCopy = [...goodsFromServer];
  const [sortType, setSortType] = useState(null);
  const [reverseOfArray, setReverseOfArray] = useState(null);

  if (sortType === SORT_BY_NAME) {
    goodsCopy.sort((goods1, goods2) => goods1.localeCompare(goods2));
  }

  if (sortType === SORT_BY_LENGTH) {
    goodsCopy.sort((goods1, goods2) => goods1.length - goods2.length);
  }

  if (reverseOfArray === REVERSE) {
    goodsCopy.reverse();
  }

  if (sortType === null && reverseOfArray === null) {
    isSortParametersNull = null;
  } else {
    isSortParametersNull = 'yes';
  }

  function setResets() {
    setSortType(null);
    setReverseOfArray(null);
  }

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

        {reverseOfArray === null ? (
          <button
            onClick={() => setReverseOfArray(REVERSE)}
            type="button"
            className="button is-warning is-light"
          >
            Reverse
          </button>
        ) : (
          <button
            onClick={() => setReverseOfArray(null)}
            type="button"
            className={cn('button is-warning', {
              'is-light': reverseOfArray === null,
            })}
          >
            Reverse
          </button>
        )}

        {isSortParametersNull !== null ? (
          <button
            onClick={setResets}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goodsCopy.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
}
