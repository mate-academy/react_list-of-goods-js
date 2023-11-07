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

const SORT_FIELD_NAME = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPrepareGoods(goods,
  { sortField, reverseField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return null;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer,
    {
      sortField,
      reverseField,
    });
  const buttonClassName = sortField === SORT_FIELD_NAME
    ? 'button is-info'
    : 'button is-info is-light';
  const buttonClassLength = sortField === SORT_FIELD_LENGTH
    ? 'button is-success'
    : 'button is-success is-light';
  const buttonClassNameReverse = reverseField
    ? 'button is-warning'
    : 'button is-warning is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={buttonClassName}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={buttonClassLength}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={buttonClassNameReverse}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => setSortField('') || setReverseField(false)}
            type="button"
            className="button is-danger is-light"
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
