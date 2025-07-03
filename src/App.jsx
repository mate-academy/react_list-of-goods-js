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

function getPrepearedGoods(goods, sortField, sortOrder) {
  const prepearedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        prepearedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SORT_FIELD_LENGTH:
        prepearedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  return sortOrder ? prepearedGoods.reverse() : prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(false);

  const handleSort = field => {
    if (field === sortField) {
      setSortOrder(!sortOrder);
    } else {
      setSortOrder(false);
      setSortField(field);
    }
  };

  const visibleGoods = getPrepearedGoods(goodsFromServer, sortField, sortOrder);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            handleSort(SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            handleSort(SORT_FIELD_LENGTH);
          }}
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setSortOrder(!sortOrder);
          }}
          type="button"
          className={
            sortField === SORT_FIELD_REVERSE
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Reverse
        </button>

        <button
          onClick={() => handleSort('')}
          type="button"
          className="button is-danger is-light"
          style={{ display: !sortField ? 'none' : 'inline-block'}}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li className="item" key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
