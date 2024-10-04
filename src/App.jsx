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

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [isReversed, setReverse] = useState(false);

  const SORT_ALPHABETICALLY = 'Sort alphabetically';
  const SORT_LENGTH = 'Sort by length';

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SORT_LENGTH:
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
    setsortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[SORT_ALPHABETICALLY, SORT_LENGTH].map(field => (
          <button
            key={field}
            type="button"
            className={classNames('button is-info', {
              'is-light': sortField !== field,
            })}
            onClick={() => setsortField(field)}
          >
            {field}
          </button>
        ))}
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverse(!isReversed)}
        >
          Reversed
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-info is-light"
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
