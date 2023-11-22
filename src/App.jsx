import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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

const SORT_METHOD_ALPHABETICALLY = 'alphabetically';
const SORT_METHOD_BY_LENGTH = 'length';

const getViewGoods = (goods, sortMethod, isReversed) => {
  let sortedGoods = [...goods];

  switch (sortMethod) {
    case SORT_METHOD_ALPHABETICALLY:
      sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_METHOD_BY_LENGTH:
      sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const viewGoods = getViewGoods(goodsFromServer, sortMethod, isReversed);

  const resetSortingType = () => {
    setSortMethod('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortMethod !== SORT_METHOD_ALPHABETICALLY },
          )}
          onClick={() => setSortMethod(SORT_METHOD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortMethod !== SORT_METHOD_BY_LENGTH },
          )}
          onClick={() => setSortMethod(SORT_METHOD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        { (sortMethod || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortingType}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {viewGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
