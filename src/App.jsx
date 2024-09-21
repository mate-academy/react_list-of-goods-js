import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

const sortingActions = {
  alphabetically: 'Alphabetically',
  length: 'Length',
};

function handleGoodsSortAction(goods, action, isReversed) {
  const renderedGoods = [...goods];

  if (action) {
    renderedGoods.sort((good1, good2) => {
      switch (action) {
        case sortingActions.alphabetically:
          return good1.trim().localeCompare(good2.trim());
        case sortingActions.length:
          return good1.trim().length - good2.trim().length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    renderedGoods.reverse();
  }

  return renderedGoods;
}

function resetState(...args) {
  args.forEach(arg => arg(false));
}

export const App = () => {
  const [sortAction, setSortAction] = useState('');
  const [reversed, setReversed] = useState(false);

  const { alphabetically, length } = sortingActions;

  const handledGoods = handleGoodsSortAction(
    goodsFromServer,
    sortAction,
    reversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortAction !== alphabetically,
          })}
          onClick={() => setSortAction(alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortAction !== length,
          })}
          onClick={() => setSortAction(length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortAction || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => resetState(setReversed, setSortAction)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {handledGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
