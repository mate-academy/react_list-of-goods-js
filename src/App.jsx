import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList';

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortCondition, reverseCondition }) {
  const preparedGoods = [...goods];

  if (sortCondition) {
    preparedGoods.sort((good1, good2) => {
      switch (sortCondition) {
        case 'alphabet':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseCondition) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortCondition, setSortCondition] = useState('');
  const [reverseCondition, setReverseCondition] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortCondition, reverseCondition },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortCondition(SORT_ALPHABET)}
          className={`button is-info ${sortCondition === SORT_ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortCondition(SORT_LENGTH)}
          className={`button is-success ${sortCondition === SORT_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseCondition(!reverseCondition)}
          className={`button is-warning ${reverseCondition === true ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortCondition || reverseCondition) && (
          <button
            type="button"
            onClick={() => {
              setSortCondition('');
              setReverseCondition(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
