import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_FIELD_NAME = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_REVERSE = 'Reverse';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const sortByName = () => {
    setVisibleGoods([...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)));
    setSortField(SORT_FIELD_NAME);
  }
  const sortByLength = () => {
    setVisibleGoods([...visibleGoods].sort((good1, good2) => good1.length - good2.length));
    setSortField(SORT_FIELD_LENGTH);
  }

  const makeReverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setSortField(SORT_FIELD_REVERSE);
  }

  const reset = () => {
   setVisibleGoods(goodsFromServer);
   setSortField('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
          onClick={sortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': sortField !== SORT_FIELD_REVERSE,
          })}
          onClick={makeReverse}
        >
          Reverse
        </button>
        {visibleGoods !== goodsFromServer && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};