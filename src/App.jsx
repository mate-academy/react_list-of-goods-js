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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_REVERSE = 'Reverse';

function getPreperedGoods(sortField, isReversed) {
  const preperedGoods = [...goodsFromServer];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreperedGoods(sortField, isReversed);
  const sortedOrReversedList = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          {SORT_FIELD_ALPHABETICALLY}
        </button>

        <button
          onClick={() => setsortField(SORT_FIELD_LENGTH)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          {SORT_FIELD_LENGTH}
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          {SORT_FIELD_REVERSE}
        </button>

        {sortedOrReversedList && (
          <button
            onClick={() => {
              setsortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
