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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

const sort = (array, typeOfSort) => {
  if (typeOfSort === SORT_BY_LENGTH) {
    array.sort((a, b) => a.length - b.length);
  }

  if (typeOfSort === SORT_BY_ALPHABET) {
    array.sort((a, b) => a.localeCompare(b));
  }
};

export const App = () => {
  const [selectedSort, setSelectedSort] = useState('');
  const [reverseSort, setReverseSort] = useState(false);
  const [resetSort, setResetSort] = useState(false);
  const newGoods = [...goodsFromServer];

  sort(newGoods, selectedSort);

  if (reverseSort) {
    newGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${selectedSort !== SORT_BY_ALPHABET && 'is-light'}`}
          onClick={() => {
            setSelectedSort(SORT_BY_ALPHABET);
            setResetSort(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${selectedSort !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={() => {
            setSelectedSort(SORT_BY_LENGTH);
            setResetSort(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverseSort && 'is-light'}`}
          onClick={() => {
            setReverseSort(!reverseSort);
            setResetSort(false);
          }}
        >
          Reverse
        </button>

        {(selectedSort || reverseSort) && (
          <button
            type="button"
            className={`button is-danger ${!resetSort && 'is-light'}`}
            onClick={() => {
              setSelectedSort('');
              setReverseSort(false);
              setResetSort(!resetSort);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {newGoods.map(g => (
          <li data-cy="Good" key={g}>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
