import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_ALPHABETICAL = 'alphabetical';
const SORT_FIELD_LENGTH = 'length';

function getPrepearedGoods(goods, { sortField, reverseOrder }) {
  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_ALPHABETICAL) {
    preparedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
  } else if (sortField === SORT_FIELD_LENGTH) {
    preparedGoods.sort((a, b) => b.length - a.length);
  }

  if (reverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseOrder,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': sortField !== SORT_FIELD_ALPHABETICAL })}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': sortField !== SORT_FIELD_LENGTH })}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reverseOrder })}`}
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${cn({ 'is-hidden': !reverseOrder && !sortField })}`}
          onClick={() => {
            setSortField('');
            setReverseOrder(false);
          }}
        >
          Reset
        </button>
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
