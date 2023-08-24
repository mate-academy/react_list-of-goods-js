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

function getPreparedGoods(goods, { sortField, isReverseField }) {
  let preparedgoods = [...goods];

  if (sortField) {
    preparedgoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverseField) {
    preparedgoods = preparedgoods.reverse();
  }

  return preparedgoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverseField, setIsReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => (
            isReverseField
              ? setIsReverseField(false)
              : setIsReverseField(true)
          )}
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReverseField },
          )}
        >
          Reverse
        </button>
        {(sortField !== '' || isReverseField)
        && (
          <button
            onClick={() => {
              setSortField('');
              setIsReverseField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={`${good}`}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
