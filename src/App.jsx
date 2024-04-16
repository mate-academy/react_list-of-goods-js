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

export const App = () => {
  const [state, setState] = useState({
    sortedGoods: [...goodsFromServer],
    buttonSortAplha: { 'is-light': true, 'button is-info': true },
    buttonSortLength: {
      'is-light': true,
      'button is-info': true,
      'is-success': true,
    },
    buttonReverse: { button: true, 'is-warning': true, 'is-light': true },
    buttonRestart: false,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(state.buttonSortAplha)}
          onClick={() => {
            if (state.buttonSortAplha['is-light']) {
              const sorted = state.buttonReverse['is-light']
                ? [...state.sortedGoods].sort((a, b) => a.localeCompare(b))
                : [...state.sortedGoods]
                    .sort((a, b) => a.localeCompare(b))
                    .reverse();

              return setState({
                ...state,
                sortedGoods: [...sorted],
                buttonSortAplha: {
                  ...state.buttonSortAplha,
                  'is-light': false,
                },
                buttonSortLength: {
                  ...state.buttonSortLength,
                  'is-light': true,
                },
                buttonRestart: true,
              });
            }

            return setState(state);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(state.buttonSortLength)}
          onClick={() => {
            if (state.buttonSortLength['is-light']) {
              let sorted = [...state.sortedGoods].sort(
                (a, b) => a.length - b.length,
              );

              if (!state.buttonReverse['is-light']) {
                sorted = [...state.sortedGoods].sort(
                  (a, b) => b.length - a.length,
                );
              }

              return setState({
                ...state,
                sortedGoods: [...sorted],
                buttonSortAplha: { ...state.buttonSortAplha, 'is-light': true },
                buttonSortLength: {
                  ...state.buttonSortLength,
                  'is-light': false,
                },
                buttonRestart: true,
              });
            }

            return setState(state);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(state.buttonReverse)}
          onClick={() => {
            return setState({
              ...state,
              sortedGoods: [...state.sortedGoods.reverse()],
              buttonReverse: {
                button: true,
                'is-warning': true,
                'is-light': !state.buttonReverse['is-light'],
              },
              buttonRestart:
                !state.buttonSortAplha['is-light'] ||
                !state.buttonSortLength['is-light'] ||
                !state.buttonRestart,
            });
          }}
        >
          Reverse
        </button>

        {state.buttonRestart && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              const newState = {
                sortedGoods: [...goodsFromServer],
                buttonSortAplha: { 'is-light': true, 'button is-info': true },
                buttonSortLength: {
                  'is-light': true,
                  'button is-info': true,
                  'is-success': true,
                },
                buttonReverse: {
                  button: true,
                  'is-warning': true,
                  'is-light': true,
                },
                buttonRestart: false,
              };

              return setState(newState);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {state.sortedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
