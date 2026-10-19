import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const SORT_ALPHABETICALLY = 'alpha';
const SORT_BY_LENGTH = 'len';

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
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:
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
          type="button"
          className={classNames(
            'button is-info',
            sortField === SORT_ALPHABETICALLY ? '' : 'is-light',
          )}
          onClick={() => {
            setSortField(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames(
            'button is-success',
            sortField === SORT_BY_LENGTH ? '' : 'is-light',
          )}
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames(
            'button is-warning',
            reversed ? '' : 'is-light',
          )}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>
        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
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
