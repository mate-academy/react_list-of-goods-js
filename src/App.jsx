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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'alphabetically':
        return good1.localeCompare(good2);
      case 'by length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        {['alphabetically', 'by length'].map(field => (
          <button
            key={field}
            type="button"
            className={cn('button', 'is-info', {
              'is-light': sortField !== field,
            })}
            onClick={() => setSortField(field)}
          >
            Sort {field}
          </button>
        ))}

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== '' || reverse !== false) && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': false,
            })}
            onClick={() => {
              setSortField('');
              setReverse(false);
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
