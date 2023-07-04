import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const buttons = [
  {
    name: 'Sort alphabetically',
    color: 'is-info',
  },
  {
    name: 'Sort by length',
    color: 'is-success',
  },
  {
    name: 'Reverse',
    color: 'is-warning',
  },
];

export const App = () => {
  const [stateSort, setStateSort] = useState(null);
  const [stateReverse, setStateReverse] = useState(null);
  let goods = [...goodsFromServer];

  switch (stateSort) {
    case 'Sort alphabetically':
      goods = goods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case 'Sort by length':
      goods = goods.sort((good1, good2) => good1.length - good2.length);
      break;
    case null:
      goods = [...goodsFromServer];
      break;
    default:
      goods = [...goodsFromServer];
  }

  if (stateReverse) {
    goods = goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">

        {buttons.map((button) => {
          const isSort = button.name !== stateSort;
          const isReverse = button.name !== stateReverse;

          return (
            <button
              key={button.name}
              type="button"
              className={classNames(
                'button', button.color, { 'is-light': isSort && isReverse },
              )}
              onClick={() => {
                if (button.name === 'Reverse') {
                  if (stateReverse) {
                    setStateReverse(null);
                  } else {
                    setStateReverse(button.name);
                  }
                } else {
                  setStateSort(button.name);
                }
              }}
            >
              {button.name}
            </button>
          );
        })
        }

        {
          (stateSort || stateReverse)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setStateSort(null);
                setStateReverse(null);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {goods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
