import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', 'is-light', {
            'is-active': sortField === SORT_FIELD_NAME,
          })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', 'is-light', {
            'is-active': sortField === SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        {isReversed ? (
          <>
            <button
              type="button"
              className={cn('button', 'is-warning', 'is-light', {
                'is-active': isReversed === true,
              })}
              onClick={() => setIsReversed(false)}
            >
              Reverse
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={cn('button', 'is-warning', 'is-light', {
                'is-active': isReversed === true,
              })}
              onClick={() => setIsReversed(true)}
            >
              Reverse
            </button>
          </>
        )}

        {sortField || isReversed ? (
          <>
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          </>
        ) : (
          ''
        )}
      </div>

      <ul>
        <li data-cy="Good">Dumplings</li>
        <li data-cy="Good">Carrot</li>
        <li data-cy="Good">Eggs</li>
        <li data-cy="Good">Ice cream</li>
        <li data-cy="Good">Apple</li>
        <li data-cy="Good">...</li>
      </ul>
    </div>
  );
};
