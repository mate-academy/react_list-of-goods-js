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

const SELECTED_ALFABET = 'Sort alphabetically';
const SELECTED_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { selected, reverse }) {
  let preparedGoods = [...goods];

  if (selected) {
    preparedGoods.sort((good1, good2) => {
      switch (selected) {
        case SELECTED_ALFABET:
          return good1.localeCompare(good2);

        case SELECTED_LENGTH:
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
  const [selected, setSelected] = useState('');
  const [reverse, setReverse] = useState(false);

  let visibleGoods = getPreparedGoods(goodsFromServer, { selected, reverse });

  const handleReverseClick = () => {
    setReverse(prev => !prev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSelected(SELECTED_ALFABET)}
          className={cn('button', 'is-info', {
            'is-light': selected !== SELECTED_ALFABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSelected(SELECTED_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': selected !== SELECTED_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(selected || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSelected('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
