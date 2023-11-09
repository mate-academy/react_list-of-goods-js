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

const SORT_FIELD_ALPH = 'alph';
const SORT_BY_LENGTH = 'length';
const SORT_REVERSE = 'reverse';

function getSortedGoods(goods, { sortField, direction }) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPH:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (direction) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [direction, setDirection] = useState('');
  const sortedGoods = getSortedGoods(goodsFromServer, { sortField, direction });

  const reset = () => {
    setSortField('');
    setDirection('');
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn({ 'is-light': sortField !== SORT_FIELD_ALPH,
              button: true,
              'is-info': true })}
            onClick={() => setSortField(SORT_FIELD_ALPH)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn({ 'is-light': sortField !== SORT_BY_LENGTH,
              button: true,
              'is-success': true })}
            onClick={() => setSortField(SORT_BY_LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn({ 'is-light': direction !== SORT_REVERSE,
              button: true,
              'is-warning': true })}
            onClick={() => setDirection(!direction ? SORT_REVERSE : '')}
          >
            Reverse
          </button>

          {(!!sortField || !!direction)
            && (
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
          {sortedGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
