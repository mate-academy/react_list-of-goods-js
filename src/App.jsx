import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';
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

function getPreparedList(array, sortBy, reverse) {
  const preparedList = [...array];

  preparedList.sort((good1, good2) => {
    switch (sortBy) {
      case 'alph':
        return good1.localeCompare(good2);
      case 'len':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    preparedList.reverse();
  }

  return preparedList;
}

export const App = () => {
  const [sortBy, setSortBy] = React.useState('');
  const [isReversed, setIsReversed] = React.useState(false);

  const preparedList = getPreparedList(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== 'alph',
          })}
          onClick={() => setSortBy('alph')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== 'len',
          })}
          onClick={() => setSortBy('len')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(isReversed || sortBy) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedList.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
