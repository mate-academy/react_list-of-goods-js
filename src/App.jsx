import { useState, useEffect } from 'react';
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
const CONST_STATE_BY_LENGTH = 'byLength';
const CONST_STATE_BY_ALPHABET = 'byAlphabet';

function prepareTodos(data, sortBy, isReversed) {
  let todos = [...data];

  if (sortBy === CONST_STATE_BY_LENGTH) {
    todos.sort((a, b) => a.length - b.length);
  } else if (sortBy === CONST_STATE_BY_ALPHABET) {
    todos.sort((a, b) => a.localeCompare(b));
  }

  if (isReversed) {
    todos = todos.reverse();
  }

  return todos;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [sortStateReverse, setSortStateReverse] = useState(false); // Use a boolean to track the reverse state

  const [todos, setTodos] = useState(goodsFromServer);

  useEffect(() => {
    const preparedTodos = prepareTodos(
      goodsFromServer,
      sortBy,
      sortStateReverse,
    );

    setTodos(preparedTodos);
  }, [sortBy, sortStateReverse]);

  function toggleReverse() {
    setSortStateReverse(!sortStateReverse);
  }

  function reset() {
    setSortBy(null);
    setSortStateReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== CONST_STATE_BY_ALPHABET,
          })}
          onClick={() => setSortBy(CONST_STATE_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== CONST_STATE_BY_LENGTH,
          })}
          onClick={() => setSortBy(CONST_STATE_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortStateReverse,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortBy || sortStateReverse) && (
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
        {todos.map((todo, index) => (
          <li data-cy="Good">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
};
