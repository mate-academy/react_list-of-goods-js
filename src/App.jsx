import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  let goods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [reverseList, setReverseList] = useState(false);

  switch (sortField) {
    case SORT_FIELD_ALPHABETICALLY:
      goods = goods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      goods = goods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverseList) {
    goods = goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABETICALLY ? 'is-light' : ''}`}
          onClick={() => (
            setSortField(SORT_FIELD_ALPHABETICALLY)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
          onClick={() => (
            setSortField(SORT_FIELD_LENGTH)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseList ? '' : 'is-light'}`}
          onClick={() => {
            if (reverseList) {
              setReverseList(false);
            } else {
              setReverseList(true);
            }
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reverseList) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseList(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
