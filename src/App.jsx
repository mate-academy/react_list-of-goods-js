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
const SORT_BY_LENGTH = 'length';
const SORT_BY_ALHPABET = 'alpha';
const SET_REVERSE = 'reverse';

const getSortedGoods = (arrayOfGoods, { sortValue, reverseValue }) => {
  const copyOfGoods = [...arrayOfGoods];

  if (sortValue) {
    copyOfGoods.sort((goodA, goodB) => {
      switch (sortValue) {
        case SORT_BY_ALHPABET:
          return goodA.localeCompare(goodB);
        case SORT_BY_LENGTH:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (reverseValue) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
};

export const App = () => {
  const [sortValue, setsortValue] = useState('');
  const [reverseValue, setReverseValue] = useState('');
  const goodsForRender = getSortedGoods(goodsFromServer,
    { sortValue, reverseValue });

  const resetButon = () => {
    setsortValue('');
    setReverseValue('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light':
          sortValue !== SORT_BY_ALHPABET })}
          onClick={() => setsortValue(SORT_BY_ALHPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', { 'is-light':
          sortValue !== SORT_BY_LENGTH })}
          onClick={() => setsortValue(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseValue })}
          onClick={() => (reverseValue
            ? setReverseValue('')
            : setReverseValue(SET_REVERSE))}
        >
          Reverse
        </button>
        {(sortValue || reverseValue) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetButon}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goodsForRender.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
