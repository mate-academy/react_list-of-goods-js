import 'bulma/css/bulma.css';
import './App.scss';
import { useReducer } from 'react';
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

const initialState = {
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

const reducer = (prevState, action) => {
  const functions = {
    alpha: () => {
      if (prevState.buttonSortAplha['is-light']) {
        const sorted = prevState.buttonReverse['is-light']
          ? [...prevState.sortedGoods].sort((a, b) => a.localeCompare(b))
          : [...prevState.sortedGoods]
              .sort((a, b) => a.localeCompare(b))
              .reverse();

        return {
          ...prevState,
          sortedGoods: [...sorted],
          buttonSortAplha: {
            ...prevState.buttonSortAplha,
            'is-light': false,
          },
          buttonSortLength: {
            ...prevState.buttonSortLength,
            'is-light': true,
          },
          buttonRestart: true,
        };
      }

      return prevState;
    },
    length: () => {
      if (prevState.buttonSortLength['is-light']) {
        let sorted = [...prevState.sortedGoods].sort(
          (a, b) => a.length - b.length,
        );

        if (!prevState.buttonReverse['is-light']) {
          sorted = [...prevState.sortedGoods].sort(
            (a, b) => b.length - a.length,
          );
        }

        return {
          ...prevState,
          sortedGoods: [...sorted],
          buttonSortAplha: { ...prevState.buttonSortAplha, 'is-light': true },
          buttonSortLength: {
            ...prevState.buttonSortLength,
            'is-light': false,
          },
          buttonRestart: true,
        };
      }

      return prevState;
    },
    reverse: () => {
      return {
        ...prevState,
        sortedGoods: [...prevState.sortedGoods.reverse()],
        buttonReverse: {
          button: true,
          'is-warning': true,
          'is-light': !prevState.buttonReverse['is-light'],
        },
        buttonRestart:
          !prevState.buttonSortAplha['is-light'] ||
          !prevState.buttonSortLength['is-light'] ||
          !prevState.buttonRestart,
      };
    },
    reset: () => {
      return {
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
    },
  };

  return functions[action]();
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(state.buttonSortAplha)}
          onClick={() => dispatch('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(state.buttonSortLength)}
          onClick={() => dispatch('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(state.buttonReverse)}
          onClick={() => dispatch('reverse')}
        >
          Reverse
        </button>

        {state.buttonRestart && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => dispatch('reset')}
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
