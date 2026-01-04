import 'bulma/css/bulma.css';
import cn from 'classnames';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseStatus, setReverseStatus] = useState(false);
  const goodsCopy = [...goodsFromServer];

  switch (sortField) {
    case SORT_BY_ALPHABET:
      goodsCopy.sort((good1, good2) => good1.localeCompare(good2));

      break;

    case SORT_BY_LENGTH:
      goodsCopy.sort((good1, good2) => good1.length - good2.length);

      break;

    default:
      break;
  }

  if (reverseStatus) goodsCopy.reverse();

  const resetGoods = () => {
    setSortField('');
    setReverseStatus(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setReverseStatus(isReverse => !isReverse);
          }}
          className={cn('button', 'is-warning', { 'is-light': !reverseStatus })}
        >
          Reverse
        </button>

        {(sortField || reverseStatus) && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsCopy.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
