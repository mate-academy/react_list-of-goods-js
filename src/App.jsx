import { useState } from 'react';
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

const RESET_SORTING = 0;
const ALPHABETICAL_SORTING = 1;
const SORT_BY_LENGTH = 2;

function prepareGoods(goods, sortType, reversed) {
  const preparedGoods = [...goods];

  // eslint-disable-next-line default-case
  switch (sortType) {
    case RESET_SORTING:
      break;

    case ALPHABETICAL_SORTING:
      preparedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;
  }

  return reversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(RESET_SORTING);

  const preparedGoods = prepareGoods(goodsFromServer, sortType, reversed);

  const reset = () => {
    setReversed(false);
    setSortType(RESET_SORTING);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(ALPHABETICAL_SORTING)}
          className={cn('button', 'is-info', {
            'is-light': sortType !== ALPHABETICAL_SORTING,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortType !== RESET_SORTING || reversed) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
