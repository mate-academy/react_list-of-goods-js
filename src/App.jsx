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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  const compare = (a, b) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        return a.localeCompare(b);
      case SORT_FIELD_LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  };

  preparedGoods.sort(compare);

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [goods] = useState([...goodsFromServer]);

  const visibleGoods = getPreparedGoods(goods, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={
            SORT_FIELD_ALPHABETICALLY === sortField
              ? 'button is-info'
              : 'button is-info is-light'
          }
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={
            SORT_FIELD_LENGTH === sortField
              ? 'button is-success'
              : 'button is-success is-light'
          }
          type="button"
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          type="button"
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
