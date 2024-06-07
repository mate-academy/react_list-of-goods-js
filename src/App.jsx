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
  const [filteredGoods] = useState(goodsFromServer);
  const [corectSortField, setCorectSortField] = useState('');
  const [corectReverse, setCorectReverse] = useState(false);

  function getPreparedGoods(goods) {
    const sortedGoods = [...goods];

    switch (corectSortField) {
      case SORT_ALPH:
        sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT_LENGTH:
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        break;
    }

    if (corectReverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const visibleGoods = getPreparedGoods(filteredGoods, {
    corectSortField,
    corectReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': corectSortField !== SORT_ALPH,
          })}
          onClick={() => {
            setCorectSortField(SORT_ALPH);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': corectSortField !== SORT_LENGTH,
          })}
          onClick={() => {
            setCorectSortField(SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !corectReverse })}
          onClick={() => setCorectReverse(!corectReverse)}
        >
          Reverse
        </button>

        {(corectSortField || corectReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setCorectSortField('');
              setCorectReverse(false);
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
