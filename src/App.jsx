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

const SORT_ALPHABETICALLY = 'sort alpabetically';
const SORT_BY_LENGTH = 'sort by length';

export const App = () => {
  const visibleGoods = [...goodsFromServer];

  const [field, setField] = useState(visibleGoods);
  const [activeSortButton, setActiveSortButton] = useState(null);
  const [activeReverseButton, setActiveReverseButton] = useState(false);

  const viewReset = activeSortButton || activeReverseButton;

  const sortByAlphabetically = active => {
    if (activeReverseButton) {
      setField(currentState =>
        [...currentState].sort((a, b) => b.localeCompare(a)),
      );
    } else {
      setField(currentState =>
        [...currentState].sort((a, b) => a.localeCompare(b)),
      );
    }

    setActiveSortButton(active);
  };

  const sortByLength = active => {
    if (activeReverseButton) {
      setField(currentState =>
        [...currentState].sort((a, b) => b.length - a.length),
      );
    } else {
      setField(currentState =>
        [...currentState].sort((a, b) => a.length - b.length),
      );
    }

    setActiveSortButton(active);
  };

  const sortReversed = () => {
    setField(field.reverse());
    setActiveReverseButton(!activeReverseButton);
  };

  const reset = () => {
    setField([...goodsFromServer]);
    setActiveSortButton(null);
    setActiveReverseButton(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': activeSortButton !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            sortByAlphabetically(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': activeSortButton !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            sortByLength(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': activeReverseButton === false,
          })}
          onClick={() => sortReversed(true)}
        >
          Reverse
        </button>

        {viewReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {field.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
