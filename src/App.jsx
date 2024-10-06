import { useState } from 'react';
import classNames from 'classnames';

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReverse] = useState(false);

  const SORT_AB = 'Sort alphabetically';
  const SORT_LNG = 'Sort by length';

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_AB:
        return good1.localeCompare(good2);
      case SORT_LNG:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const reset = () => {
    visibleGoods = goodsFromServer;
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[SORT_AB, SORT_LNG].map(field => (
          <button
            key={field}
            type="button"
            className={classNames('button is-info', {
              'is-light': sortField !== field,
            })}
            onClick={() => setSortField(field)}
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverse(!isReversed)}
        >
          Reversed
        </button>

        {(sortField || isReversed) && (
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
