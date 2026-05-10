import { useState } from 'react';
// import cn from "classnames";

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

const SORT_ALPHABETICALLY = 'alphabetically';
// const SORT_LENGTH = 'name';
// const SORT_FIELD_COLOR = 'color';

function getPreparedGoods(goods, { sortAlphabetically, reversed, length }) {
  let preparedGoods = [...goods];

  if (sortAlphabetically) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (length) {
    preparedGoods = preparedGoods.sort(
      (good1, good2) => good1.length - good2.length,
    );
  }

  if (reversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortAlphabetically, setSortAlphabetically] = useState('');
  const [reversed, setReversed] = useState(false);
  const [length, setLength] = useState(0);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortAlphabetically,
    length,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className="button is-info is-light"
          className={`button is-info ${
            sortAlphabetically === SORT_ALPHABETICALLY ? '' : 'is-light'
          }`}
          onClick={() => setSortAlphabetically(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          // className="button is-success is-light"
          className={`button is-success ${length ? '' : 'is-light'}`}
          onClick={() => setLength(1)}
        >
          Sort by length
        </button>

        <button
          type="button"
          // className="button is-warning is-light"
          className={`button is-warning ${
            reversed === false ? 'is-light' : ''
          }`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortAlphabetically || length || reversed) && (
          <button
            type="button"
            // className="button is-danger is-light"
            // className="button is-danger"
            className={`button is-danger
            ${sortAlphabetically || length || reversed ? '' : 'is-light'}`}
            onClick={() => {
              setSortAlphabetically('');
              setLength(0);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>

      {/* <ul>
        <li data-cy="Good">Dumplings</li>
        <li data-cy="Good">Carrot</li>
        <li data-cy="Good">Eggs</li>
        <li data-cy="Good">Ice cream</li>
        <li data-cy="Good">Apple</li>
        <li data-cy="Good">...</li>
      </ul> */}
    </div>
  );
};
