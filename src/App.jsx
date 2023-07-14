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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function sortBy(goods, sortField, isReversed) {
  const goodsArray = [...goods];

  if (sortField) {
    goodsArray.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    goodsArray.reverse();
  }

  return goodsArray;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const result = sortBy(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={cn('button is-info', {
            '': sortField === SORT_FIELD_ALPHABETICALLY,
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            '': sortField === SORT_FIELD_LENGTH,
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setIsReversed(false);
            setSortField('');
          }}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {result.map(x => (
          <li
            data-cy="Good"
            key={x}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
};
