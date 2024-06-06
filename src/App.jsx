import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { GoodList } from './Components/GoodList/GoodList';

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

const SORT_ALPH = 'alphabetically';
const SORT_LENGTH = 'length';

export const App = () => {
  const [filteredGoods, setFilteredGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  function getPreparedGoods(goods, { localSortField, localReverse }) {
    const sortedGoods = [...goods];

    switch (localSortField) {
      case SORT_ALPH:
        sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT_LENGTH:
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        break;
    }

    if (localReverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const visibleGoods = getPreparedGoods(filteredGoods, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPH,
          })}
          onClick={() => {
            setSortField(SORT_ALPH);
            setReverse(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_LENGTH);
            setReverse(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverse(false);
              setFilteredGoods(goodsFromServer);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={visibleGoods} />
    </div>
  );
};
