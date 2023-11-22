import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import cn from 'classnames';

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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_BY_LENGTH = 'by length';
const FALSE = false;

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const readyGoods = getPreparedGoods(goodsFromServer, { sortField, reverse });

  const doSortAlphabetically = () => setSortField(SORT_FIELD_ALPHABETICALLY);
  const doSortByLength = () => setSortField(SORT_FIELD_BY_LENGTH);
  const doReverse = () => setReverse(!reverse);
  const doReset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': sortField !== SORT_FIELD_ALPHABETICALLY })}
          onClick={doSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': sortField !== SORT_FIELD_BY_LENGTH })}
          onClick={doSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning',
              { 'is-light': reverse === FALSE })}
          onClick={doReverse}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={doReset}
        >
          Reset
        </button>
        )
}
      </div>

      <ul>
        {readyGoods.map((good, index) => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
