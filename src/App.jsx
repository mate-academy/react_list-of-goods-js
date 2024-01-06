import React, { useState } from 'react';
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

const SORT_LENGTH = 'length';
const SORT_ALPHABET = 'alphabet';
const REVERSE_FLAG = 'reverse';

export default function App() {
  const [state, setState] = useState({
    reverse: '',
    sortField: '',
    visibleGoods: [...goodsFromServer],
  });

  function reverseGoods() {
    setState(prevState => ({
      ...prevState,
      reverse: prevState.reverse === REVERSE_FLAG ? '' : REVERSE_FLAG,
      visibleGoods: [...prevState.visibleGoods].reverse(),
    }));
  }

  function sortByLength() {
    const sortedVisibleGoods = [...goodsFromServer]
      .sort((a, b) => a.length - b.length);

    if (state.reverse === REVERSE_FLAG) {
      sortedVisibleGoods.reverse();
    }

    setState(prevState => ({
      ...prevState,
      sortField: SORT_LENGTH,
      visibleGoods: sortedVisibleGoods,
    }));
  }

  function sortByAlphabet() {
    const sortedVisibleGoods = [...goodsFromServer]
      .sort((a, b) => a.localeCompare(b));

    if (state.reverse === REVERSE_FLAG) {
      sortedVisibleGoods.reverse();
    }

    setState(prevState => ({
      ...prevState,
      sortField: SORT_ALPHABET,
      visibleGoods: sortedVisibleGoods,
    }));
  }

  function resetGoods() {
    setState({
      reverse: '',
      sortField: '',
      visibleGoods: [...goodsFromServer],
    });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${
            state.sortField !== SORT_ALPHABET ? 'is-light' : ''
          }`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${
            state.sortField !== SORT_LENGTH ? 'is-light' : ''
          }`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={`button is-warning ${
            state.reverse !== REVERSE_FLAG ? 'is-light' : ''
          }`}
        >
          Reverse
        </button>

        {state.sortField !== '' || state.reverse !== '' ? (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {state.visibleGoods.map(e => (
          <li key={e} data-cy="Good">
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
