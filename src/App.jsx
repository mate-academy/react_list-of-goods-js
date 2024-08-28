import 'bulma/css/bulma.css';
import classNames from 'classnames';
import './App.scss';
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

const SORT_FIELD_ALPHABET = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_REVERSE = 'Reverse';

function getPreparedGoods(goods, { sortField, query }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
  });

  const buttonClassAplhabet = classNames('button', 'is-info', {
    'is-light': sortField !== SORT_FIELD_ALPHABET,
  });

  const buttonClassLength = classNames('button', 'is-success', {
    'is-light': sortField !== SORT_FIELD_LENGTH,
  });

  const buttonClassReverse = classNames('button', 'is-warning', {
    'is-light': sortField !== SORT_FIELD_REVERSE,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={buttonClassAplhabet}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={buttonClassLength}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={buttonClassReverse}
          onClick={() => setSortField(SORT_FIELD_REVERSE)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setSortField('')}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(goods => {
          return (
            <li key={goods} data-cy="Good">
              {goods}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
