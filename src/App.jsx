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

// let copy = [...goodsFromServer];

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

const reverse = list => {
  return [...list].reverse();
};

const sort = (list, sortField) => {
  return [...list].sort((good1, good2) => {
    switch (sortField) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });
};

export const App = () => {
  const [list, setList] = useState([...goodsFromServer]);
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`${sortField === SORT_BY_ALPHABET && !reversed ? 'button is-success' : 'button is-success is-light'
          }`}
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
            setList(sort(list, SORT_BY_ALPHABET));
            setReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`${sortField === SORT_BY_LENGTH && !reversed ? 'button is-success' : 'button is-success is-light'
          }`}
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
            setList(sort(list, SORT_BY_LENGTH));
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setList(reverse(list));
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {list.some((item, i) => item !== goodsFromServer[i]) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setList([...goodsFromServer]);
              setReversed(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {list.map(good => {
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
