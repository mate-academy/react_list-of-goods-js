import 'bulma/css/bulma.css';
import './App.scss';
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

export const App = () => {
  const [goods, setGood] = useState(goodsFromServer);
  const [state, setState] = useState({ key: null, direction: null });

  const sortByLenght = () => {
    setGood([...goods].sort((a, b) => a.length - b.length));
    setState({ key: 'length', direction: 'asc' });
  };

  const sortByAlphabet = () => {
    setGood([...goods].sort((a, b) => a.localeCompare(b)));
    setState({ key: 'alphabet', direction: 'asc' });
  };

  const reversed = () => {
    if (state.key === 'length' && state.direction === 'asc') {
      state.direction = 'desc';
      setGood([...goods].sort((a, b) => b.length - a.length));
    } else if (state.key === 'length' && state.direction === 'desc') {
      state.direction = 'asc';
      setGood([...goods].sort((a, b) => a.length - b.length));
    } else if (state.key === 'alphabet' && state.direction === 'asc') {
      state.direction = 'desc';
      setGood([...goods].sort((a, b) => b.localeCompare(a)));
    } else if (state.key === 'alphabet' && state.direction === 'desc') {
      state.direction = 'asc';
      setGood([...goods].sort((a, b) => a.localeCompare(b)));
    } else {
      setGood(
        [...goods].reverse()
      )
    }
  };

  const reset = () => setGood([...goodsFromServer]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className="button is-info is-light"
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLenght}
          type="button"
          className="button is-success is-light"
        >
          Sort by length
        </button>

        <button
          onClick={reversed}
          type="button"
          className="button is-warning is-light"
        >
          Reverse
        </button>

        <button onClick={reset} type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
