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

const SORT_FIELD_ALPHABET = 'Alphabet';
const SORT_FIELD_LENGTH = 'Length';
const FIELD_REVERSE = 'Reverse';

function getSortedPeople(goods, sort, reverse) {
  let visibleGoods = [...goods];

  switch (sort) {
    case SORT_FIELD_ALPHABET:
      visibleGoods = visibleGoods.sort((
        good1, good2,
      ) => good1.localeCompare(good2));
      break;
    case SORT_FIELD_LENGTH:
      visibleGoods = visibleGoods.sort((
        good1, good2,
      ) => good1.length - good2.length);
      break;
    default:
      visibleGoods = [...goodsFromServer];
      break;
  }

  if (reverse) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [reverseField, setReverseField] = useState(false);

  const sortedPeople = getSortedPeople(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': reverseField !== FIELD_REVERSE })}
          onClick={() => setReverseField(reverseField === FIELD_REVERSE
            ? false
            : 'Reverse')}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortField(null);
            setReverseField(null);
          }}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {sortedPeople.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
