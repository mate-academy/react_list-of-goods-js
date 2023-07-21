import { useState } from 'react';

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

const SORT_BY_NAME = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';
const RESET = 'Reset';

const LIGTH_COLOR_STYLE = 'is-light';

function getPreparedGoods(goods, { sortBy, order = '' }) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        case RESET:
        default:
          return 0;
      }
    });
  }

  if (order === REVERSE) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState('');

  const goodsForSort = getPreparedGoods(goodsFromServer,
    { sortBy: sortField, order: isReversed });

  const reverseGoods = () => {
    if (isReversed === REVERSE) {
      setIsReversed('');
    } else {
      setIsReversed(REVERSE);
    }
  };

  const resetGoods = () => {
    setSortField('');
    setIsReversed('');
  };

  const Reset = () => (
    <button
      type="button"
      onClick={resetGoods}
      className="button is-danger is-light"
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_BY_NAME ? '' : LIGTH_COLOR_STYLE}`}
          onClick={() => setSortField(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : LIGTH_COLOR_STYLE}`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === REVERSE ? '' : LIGTH_COLOR_STYLE}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField || isReversed) && <Reset />}
      </div>

      <ul>
        {goodsForSort.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
