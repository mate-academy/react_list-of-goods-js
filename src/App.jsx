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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABET = 'alphabet';

function getPreparedGoods(goods, { sortField }, { reverseFields }) {
  const prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((good1, good2) => {
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

  if (reverseFields) {
    return prepGoods.reverse();
  }

  return prepGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseFields, setReverse] = useState('');
  const [reset, setReset] = useState(false);
  const goods = getPreparedGoods(
    goodsFromServer,
    { sortField },
    { reverseFields },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABET
              ? 'button'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
            setReset(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? 'button'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
            setReset(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseFields ? 'button' : 'button is-info is-light'}
          onClick={() => {
            setReverse(prevreverseFields => !prevreverseFields);
            setReset(prevReset => (sortField ? true : !prevReset));
          }}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSortField('');
              setReverse(false);
              setReset(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
