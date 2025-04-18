import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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

const SORT_ABC = 'abc';
const SORT_LENGTH = 'length';
const SORT_REVERSE = 'reverse';
const SORT_RESET = 'reset';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_ABC:
        return good1.localeCompare(good2);
      case SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          key={SORT_ABC}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_ABC,
          })}
          onClick={() => {
            setSortField(SORT_ABC);
          }}
        >
          Sort alphabetically
        </button>

        <button
          key={SORT_LENGTH}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          key={SORT_REVERSE}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            key={SORT_RESET}
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
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
