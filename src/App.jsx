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
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getSort(goods, sortField, reverse) {
  const preperedGood = [...goods];

  preperedGood.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        return good1.localeCompare(good2);

      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    preperedGood.reverse();
  }

  return preperedGood;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getSort(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${cn({
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${cn({
            'is-light': reverse === false,
          })}`}
        >
          Reverse
        </button>

        {(sortField || reverse)
          && (
            <button
              onClick={() => {
                setSortField('');
                setReverse(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}

      </div>

      <ul>
        {visibleGoods.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}

      </ul>
    </div>
  );
};
