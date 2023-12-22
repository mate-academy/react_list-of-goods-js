import cn from 'classnames';
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

function getPrepearedGoods(goods, { sortField, reversedField }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reversedField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [reversedField, setReversedField] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPrepearedGoods(
    goodsFromServer, { sortField, reversedField },
  );

  const reset = () => {
    setSortField('');
    setReversedField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
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
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !reversedField },
          )}
          onClick={(() => setReversedField(!reversedField))}
        >
          Reverse
        </button>

        {
          (sortField || reversedField)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li
            data-cy="Good"
            key={goods}
          >
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
