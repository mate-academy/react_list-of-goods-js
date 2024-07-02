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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_RESET = '';

function getSortedArray(array, sortField, isReversed) {
  const preparedGoods = [...array];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SORT_FIELD_LENGTH:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReverseField] = useState(false);
  const visibleGoods = getSortedArray(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABET
              ? `button is-info`
              : `button is-info is-light`
          }
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? `button is-success`
              : `button is-success is-light`
          }
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? `button is-warning` : `button is-warning is-light`
          }
          onClick={() => setReverseField(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT_FIELD_RESET);
              setReverseField(false);
            }}
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
