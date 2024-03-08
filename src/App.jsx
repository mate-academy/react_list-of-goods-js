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

const SORT_GOODS_ALPHABET = 'Alphabet';
const SORT_GOODS_LENGTH = 'Length';

function getPreparedGoods(goods, sortFild, reversed) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortFild) {
      case SORT_GOODS_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_GOODS_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortFild, setSortFild] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortFild, reversed);

  const isSelectionActive = sortFild || reversed;

  const resetFild = () => {
    setSortFild('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortFild !== SORT_GOODS_ALPHABET,
          })}
          onClick={() => setSortFild(SORT_GOODS_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortFild !== SORT_GOODS_LENGTH,
          })}
          onClick={() => setSortFild(SORT_GOODS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning ', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isSelectionActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFild}
          >
            Reset
          </button>
        )}
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
