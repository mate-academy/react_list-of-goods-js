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

const SORT_FIELD_ALPHABET = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SORT_FIELD_LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  let visibleGoods = getPreparedGoods(goodsFromServer, { sortField });
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
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
