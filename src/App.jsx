import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './Components/GoodsList';

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

const SORT_FIELD_NAME = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, confirmation }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (confirmation) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, confirmation });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className="button is-info is-light"
          className={cn('button', 'is-info', {
            'is-ligth': sortField !== SORT_FIELD_NAME,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-ligth': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-ligth': !confirmation,
          })}
          onClick={() => {
            setConfirmation(!confirmation);
          }}
        >
          Reverse
        </button>

        {(sortField || confirmation)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setConfirmation(false);
              }}
            >
              Reset
            </button>
          )
        }

      </div>
      <GoodsList goods={visibleGoods} />
    </div>
  );
};
