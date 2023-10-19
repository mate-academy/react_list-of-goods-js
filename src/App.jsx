import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return prepearedGoods;
}

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortedGoods = getPreparedGoods(goodsFromServer, sortField);
  const visibleGoods = isAscending ? sortedGoods : sortedGoods.reverse();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_NAME)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isAscending === true,
          })}
          onClick={toggleSortOrder}
        >
          Reverse
        </button>

        {
          sortField !== '' || isAscending !== true ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setIsAscending(true);
              }}
            >
              Reset
            </button>
          ) : null
        }

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
