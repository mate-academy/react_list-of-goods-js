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
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGoord(goods, { sortField, reverseField }) {
  const preparedGood = [...goods];

  if (sortField) {
    preparedGood.sort((good1, good2) => {
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

  if (reverseField) {
    preparedGood.reverse();
  }

  return preparedGood;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getPreparedGoord(goodsFromServer, {
    sortField,
    reverseField,
  });
  const btnAlphabet =
    sortField === SORT_FIELD_ALPHABET
      ? 'button is-info'
      : 'button is-info is-light';
  const btnLength =
    sortField === SORT_FIELD_LENGTH
      ? 'button is-success'
      : 'button is-success is-light';
  const btnReverse =
    reverseField === SORT_FIELD_REVERSE
      ? 'button is-warning'
      : 'button is-warning is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={btnAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={btnLength}
        >
          Sort by length
        </button>

        {/* для кнопки реверс встановив пермикач зміни стану(true-false, це toogle кнопка) */}
        <button
          type="button"
          onClick={() => setReverseField(prev => (prev ? '' : 'reverse'))}
          className={btnReverse}
        >
          Reverse
        </button>
        {(sortField || reverseField) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReverseField('');
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
