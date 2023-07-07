import { useState } from 'react';
import className from 'classnames';
import 'bulma/css/bulma.css';
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

const SOTR_BY_ALPHABET = 'name';
const SOTR_BY_NAME_LENGTH = 'name.length';

function getSortGoods(goods, { sortField, reverseField }) {
  const listOfGoods = [...goods];

  if (sortField) {
    listOfGoods.sort((good1, good2) => {
      switch (sortField) {
        case SOTR_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SOTR_BY_NAME_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    listOfGoods.reverse();
  }

  return listOfGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = getSortGoods(
    goodsFromServer,
    { sortField, reverseField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SOTR_BY_ALPHABET)}
          className={`button is-info ${className(sortField !== SOTR_BY_ALPHABET && 'is-light')}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SOTR_BY_NAME_LENGTH)}
          className={`button is-success ${className(sortField !== SOTR_BY_NAME_LENGTH && 'is-light')}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseField(reverse => !reverse)}
          className={`button is-warning ${className(!reverseField && 'is-light')}`}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setReverseField(false);
              setSortField('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
