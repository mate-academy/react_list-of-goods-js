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

const getSortedGoods = (listOfGoods, { sortValue, reverseValue }) => {
  const copyOfGoods = [...listOfGoods];

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
  const [sortValue, setSortValue] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goodsForRender = getSortedGoods(goodsFromServer,
    { sortValue, reverseValue: isReversed });

  const resetFilters = () => {
    setSortValue('');
    setIsReversed('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light':
          sortValue !== SORT_BY_ALHPABET })}
          onClick={() => setSortValue(SORT_BY_ALHPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', { 'is-light':
          sortValue !== SORT_BY_LENGTH })}
          onClick={() => setSortValue(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(sortValue || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilters}
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
