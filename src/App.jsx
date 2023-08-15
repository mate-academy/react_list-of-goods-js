import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './Components/GoodList';

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

function getSortedGoods(goods, { appliedSort, reverseOrder }) {
  const visibleGoods = [...goods];

  if (appliedSort) {
    visibleGoods.sort((good1, good2) => {
      switch (appliedSort) {
        case 'alphabetically':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseOrder) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [appliedSort, setAppliedSort] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  const reset = () => {
    setAppliedSort('');
    setReverseOrder(false);
  };

  const visibleGoods = getSortedGoods(goodsFromServer,
    { appliedSort, reverseOrder });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${appliedSort === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setAppliedSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${appliedSort === 'length' ? '' : 'is-light'}`}
          onClick={() => setAppliedSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseOrder ? '' : 'is-light'}`}
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Reverse
        </button>

        {(appliedSort || reverseOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
