import React, { useState } from 'react';
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

const SORT_FIELD_ACTIVED = 'Alphabetic';
const SORT_LENGTH_ACTIVED = 'Length';

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_ACTIVED) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SORT_LENGTH_ACTIVED) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (!reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(true);
  const [visibleBtn, setVisiblebtn] = useState(false);
  const [visiblebtnRev, setVisiblebtnRev] = useState(true);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse: reverseField,
  });

  const btnSort = () => {
    setSortField(SORT_FIELD_ACTIVED);
    setVisiblebtn(true);
  };

  const btnSortLength = () => {
    setSortField(SORT_LENGTH_ACTIVED);
    setVisiblebtn(true);
  };

  const btnReverse = () => {
    setReverseField(reverser => !reverser);
    setVisiblebtnRev(f => !f);
  };

  const btnReset = () => {
    setVisiblebtn(false);
    setVisiblebtnRev(true);
    setSortField('');
    setReverseField(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={btnSort}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ACTIVED,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={btnSortLength}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_LENGTH_ACTIVED,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={btnReverse}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || visibleBtn || !visiblebtnRev) && (
          <button
            onClick={btnReset}
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {/* <li data-cy="Good">Dumplings</li>
      <li data-cy="Good">Carrot</li>
      <li data-cy="Good">Eggs</li>
      <li data-cy="Good">Ice cream</li>
      <li data-cy="Good">Apple</li>
      <li data-cy="Good">...</li> */}
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
