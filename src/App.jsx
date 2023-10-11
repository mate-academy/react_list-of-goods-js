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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((a, b) => {
      let result;

      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          result = a.localeCompare(b);
          break;

        case SORT_FIELD_LENGTH:
          result = a.length - b.length;
          break;

        default:
          return 0;
      }

      if (isReverse) {
        return -result;
      }

      return result;
    });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info is-light',
            { 'is-active': sortField === 'alphabet' },
          )}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success is-light',
            { 'is-active': sortField === SORT_FIELD_LENGTH }
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
              'button is-warning is-light',
              { 'is-active': isReverse }
          )}
          onClick={() => {
            if (sortField) {
              setIsReverse(!isReverse);
            }
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortField('');
            setIsReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
