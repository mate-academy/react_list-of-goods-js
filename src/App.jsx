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

const SORT_FIELD_ALPHABETIC = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPrepearedGoods(goods, { sortField, reverseField }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETIC:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getPrepearedGoods(
    goodsFromServer, { sortField, reverseField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETIC)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABETIC })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverseField })}
        >
          Reverse
        </button>

        {
          (sortField || reverseField) && (
            <button
              onClick={() => {
                setReverseField('');
                setSortField('');
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
