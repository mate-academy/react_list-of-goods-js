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

const ALPH_BUTTON_ID = 'alphabetically';
const LENGTH_BUTTON_ID = 'length';

function getPrepareGoods(goods, sortField, reverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case ALPH_BUTTON_ID:
          return good1.localeCompare(good2);
        case LENGTH_BUTTON_ID:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPrepareGoods(goodsFromServer, sortField, isReverse);

  const onReset = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(ALPH_BUTTON_ID);
          }}
          type="button"
          className={cn('button is-info',
            sortField !== ALPH_BUTTON_ID && 'is-light')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(LENGTH_BUTTON_ID);
          }}
          type="button"
          className={cn('button is-success',
            sortField !== LENGTH_BUTTON_ID && 'is-light')}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReverse(!isReverse);
          }}
          type="button"
          className={cn('button is-warning',
            !isReverse && 'is-light')}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
          <button
            onClick={onReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
