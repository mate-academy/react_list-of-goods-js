import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const ALPHABET_SORTING = 'alphabetically';
const LENGTH_SORTING = 'length';
const REVERSE = 'reverse';
const UNREVERSE = 'unreverse';
const RESET = 'reset';
let currentGoods = [...goodsFromServer];

export const App = () => {
  const [currentSorting, setCurentSorting] = useState('');

  const [currentDirection, setCurrentDirection] = useState('');

  if (currentSorting === RESET) {
    currentGoods = [...goodsFromServer];
    setCurrentDirection('');
    setCurentSorting('');
  }

  if (currentDirection === UNREVERSE) {
    currentGoods = [...goodsFromServer];
  }

  if (currentSorting === ALPHABET_SORTING
     || currentSorting === LENGTH_SORTING) {
    currentGoods = [...goodsFromServer];

    currentGoods.sort((good1, good2) => {
      switch (currentSorting) {
        case ALPHABET_SORTING: {
          return good1.localeCompare(good2);
        }

        case LENGTH_SORTING: {
          return good1.length - good2.length;
        }

        default: return 0;
      }
    });
  }

  if (currentDirection === REVERSE && currentSorting !== RESET) {
    currentGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button',
            'is-info', {
              'is-light': currentSorting !== ALPHABET_SORTING,
            })}
          onClick={() => setCurentSorting(ALPHABET_SORTING)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button',
            'is-success', {
              'is-light': currentSorting !== LENGTH_SORTING,
            })}
          onClick={() => setCurentSorting(LENGTH_SORTING)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button',
            'is-warning', {
              'is-light': currentDirection !== REVERSE,
            })}
          onClick={() => {
            if (currentDirection !== REVERSE) {
              setCurrentDirection(REVERSE);
            } else {
              setCurrentDirection(UNREVERSE);
            }
          }
        }
        >
          Reverse
        </button>

        {currentGoods.some((currentGood, id) => (
          currentGood !== goodsFromServer[id]
        )) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setCurentSorting(RESET)}
        >
          Reset
        </button>
        )}

      </div>

      <ul>
        {currentGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
