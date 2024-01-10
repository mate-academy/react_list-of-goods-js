import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

function getSortedFields(fields, sortField, isReversed) {
  const copiedGoods = [...fields];

  if (sortField === SORT_FIELD_ALPHABET) {
    copiedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SORT_FIELD_LENGTH) {
    copiedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReserved] = useState(false);
  const showGoods = getSortedFields(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={`button is-info ${cn({
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReserved(!isReversed)}
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReserved(false);
              setSortField('');
            }
          }
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
        {/* <li data-cy="Good">Carrot</li>
      <li data-cy="Good">Eggs</li>
      <li data-cy="Good">Ice cream</li>
      <li data-cy="Good">Apple</li>
      <li data-cy="Good">...</li> */}
      </ul>
    </div>
  );
};
