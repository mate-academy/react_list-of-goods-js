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


const SORT_FIELD_BY_ALPHABET = 'alphabet';
const SORT_FIELD_BY_LENGTH = 'length';

function sortedGoods(goods, { sortField }) {
  const copiedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_BY_ALPHABET:
      copiedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_FIELD_BY_LENGTH:
      copiedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  return copiedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');

  const [reversedField, setReversedField] = useState(false);

  const reset = () => {
    setSortField('');
    setReversedField(false);
  };

  let visibleGoods = sortedGoods(goodsFromServer, { sortField });

  if (reversedField) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className=" section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {'is-light' : sortField !== SORT_FIELD_BY_ALPHABET})}
          onClick={() => setSortField(SORT_FIELD_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {'is-light' : sortField !== SORT_FIELD_BY_LENGTH})}
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {'is-light' : !reversedField})}
          onClick={() => setReversedField(!reversedField)}
        >
          Reverse
        </button>

        {(sortField || reversedField) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good"
          key={good}>
            {good}
          </li>
        ))}
        </ul>
    </div>
  );
};
