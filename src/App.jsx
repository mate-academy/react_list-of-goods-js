import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

const goodsFromServer = [
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

const SORT_BY_LENGTH = 'sortByLength';
const SORT_ALPHABETICALLY = 'sortAlphabetically';
const REVERSE_LIST = 'reverseList';
const RESET = 'reset';

function getPreparedGoodsFromServer(goods, buttonId) {
  switch (buttonId) {
    case SORT_ALPHABETICALLY:
      return [...goods].sort((good1, good2) => good1.localeCompare(good2));
    case SORT_BY_LENGTH:
      return [...goods].sort((good1, good2) => good1.length - good2.length);
    case REVERSE_LIST:
      return [...goodsFromServer].reverse();
    case RESET:
      return [...goodsFromServer];
    default:
      return goods;
  }
}

export const App = () => {
  const [visibleVegetables, setVisibleVegetables] = useState([
    ...goodsFromServer,
  ]);
  const [buttonClassSortAlpha, setButtonClassSortAlpha] =
    useState('is-info is-light');
  const [buttonClassSortByLength, setButtonClassSortByLength] = useState(
    'is-success is-light',
  );
  const [buttonClassReverse, setButtonClassReverse] = useState(
    'is-warning is-light',
  );
  const [buttonClassReset, setButtonClassReset] =
    useState('is-danger is-light');

  const buttonClick = buttonId => {
    const sortedGoods = getPreparedGoodsFromServer(visibleVegetables, buttonId);

    setVisibleVegetables(sortedGoods);

    setButtonClassSortAlpha(
      buttonId === SORT_ALPHABETICALLY ? 'is-info' : 'is-info is-light',
    );
    setButtonClassSortByLength(
      buttonId === SORT_BY_LENGTH ? 'is-success' : 'is-success is-light',
    );
    setButtonClassReverse(
      buttonId === REVERSE_LIST ? 'is-warning' : 'is-warning is-light',
    );
    setButtonClassReset(
      buttonId === RESET ? 'is-danger' : 'is-danger is-light',
    );
  };

  const resetGoods = () => {
    setVisibleVegetables([...goodsFromServer]);
  };

  const isDifferent = () => {
    return !visibleVegetables.every(
      (item, index) => item === goodsFromServer[index],
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => buttonClick(SORT_ALPHABETICALLY)}
          type="button"
          className={cn('button', buttonClassSortAlpha)}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => buttonClick(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', buttonClassSortByLength)}
        >
          Sort by length
        </button>

        <button
          onClick={() => buttonClick(REVERSE_LIST)}
          type="button"
          className={cn('button', buttonClassReverse)}
        >
          Reverse
        </button>

        {isDifferent() && (
          <button
            onClick={resetGoods}
            type="button"
            className={cn('button', buttonClassReset)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleVegetables.map(vegetable => (
          <li key={vegetable} data-cy="Good">
            {vegetable}
          </li>
        ))}
      </ul>
    </div>
  );
};
