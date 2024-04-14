import 'bulma/css/bulma.css';
import { useState } from 'react';
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

const SORT_BY_ALPHA = 'alpha';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const elems = [...goodsFromServer];

  if (sortField) {
    elems.sort((elem1, elem2) => {
      switch (sortField) {
        default:
          return 0;
        case SORT_BY_ALPHA:
          return elem1.localeCompare(elem2);
        case SORT_BY_LENGTH:
          return elem1.length - elem2.length;
      }
    });
  }

  if (reversed) {
    elems.reverse();
  }

  const Reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_BY_ALPHA
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_BY_ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={Reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {elems.map(elem => (
          <li data-cy="Good" key={elem}>
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};
