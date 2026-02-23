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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABETICALLY = 'alphabetically';

export const App = () => {
  let visibleGoods = [...goodsFromServer];
  const [revers, setRevers] = useState(false);
  const [sortBy, setSortBy] = useState('');

  visibleGoods = [...visibleGoods].sort((good1, good2) => {
    switch (sortBy) {
      case SORT_BY_LENGTH:
        return good1.length - good2.length;
      case SORT_BY_ALPHABETICALLY:
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (revers) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortBy(SORT_BY_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortBy(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !revers,
          })}
          onClick={() => {
            setRevers(!revers);
          }}
        >
          Reverse
        </button>

        {(sortBy || revers) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setRevers(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {[
          ...visibleGoods.map(good => {
            return (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            );
          }),
        ]}
      </ul>
    </div>
  );
};
