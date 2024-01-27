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

function getPrepare(arr, sortField, reverseField) {
  const prepareArr = [...arr];

  switch (sortField) {
    case SORT_FIELD_ALPHABET:
      prepareArr.sort();
      break;
    case SORT_FIELD_LENGTH:
      prepareArr.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reverseField) {
    prepareArr.reverse();
  }

  return prepareArr;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visebl = getPrepare(goodsFromServer, sortField, reverseField);

  const reset = () => {
    setSortField('');
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info',
              { 'is-light': sortField !== SORT_FIELD_ALPHABET })
          }
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success',
              { 'is-light': sortField !== SORT_FIELD_LENGTH })
          }
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning',
              { 'is-light': reverseField === false })
          }
          onClick={() => setReverseField(current => !current)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}

      </div>
      <ul>
        {visebl.map(element => (
          <li
            data-cy="Good"
            key={element}
          >
            {element}
          </li>
        ))}
      </ul>

    </div>
  );
};
