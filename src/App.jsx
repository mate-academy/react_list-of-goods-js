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
  function goodsSort(sortName, serverData) {
    const arrayCopy = [...serverData];

    return arrayCopy.sort((good1, good2) => {
      switch (sortName) {
        case 'name':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  const [sortField, setSortField] = useState('');
  const goodsList = goodsSort(sortField, goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  if (isReversed) {
    goodsList.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== 'name' },
            'button',
            'is-info',
          )}
          onClick={() => setSortField('name')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== 'length' },
            'button',
            'is-success',
          )}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            {
              'is-light': !isReversed,
            },
            'button',
            'is-warning',
          )}
          onClick={() => setIsReversed(value => !value)}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
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
        )}
      </div>

      <ul>
        {goodsList.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
