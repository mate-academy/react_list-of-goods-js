import cn from 'classnames';
import { useState } from 'react';

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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';

function getPrepearedGoods(goods, { sortField, reversed }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');
  const goods = getPrepearedGoods(goodsFromServer, { sortField, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          {SORT_FIELD_ALPHABETICALLY}
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
        >
          {SORT_FIELD_BY_LENGTH}
        </button>

        <button
          type="button"
          onClick={() => {
            setReversed(!reversed);
          }}
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
