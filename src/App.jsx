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
  const [list, setList] = useState(goodsFromServer);

  function addOrRemoveClass(elementClass) {
    const button = document.querySelector(elementClass);

    if (button.classList.contains('is-light')) {
      button.classList.remove('is-light');
    } else {
      button.classList.add('is-light');
    }
  }

  const sortAlphabetically = () => {
    const sorted = [...list].sort((a, b) => a.localeCompare(b));

    setList(sorted);

    addOrRemoveClass('.is-info');
  };

  const sortByLength = () => {
    const sortedLength = [...list].sort((a, b) => a.length - b.length);

    setList(sortedLength);

    addOrRemoveClass('.is-success');
  };

  const sortReverse = () => {
    const sortRever = [...list].reverse();

    setList(sortRever);

    addOrRemoveClass('.is-warning');
  };

  const listReset = () => {
    const reset = [...goodsFromServer];

    setList(reset);

    addOrRemoveClass('.is-danger');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          id="buttonSort"
          type="button"
          className="button is-info is-light"
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={sortReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={listReset}
        >
          Reset
        </button>
      </div>

      <ul>
        {list.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
