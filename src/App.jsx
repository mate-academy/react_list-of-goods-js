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

function getPreparedGoodsFromServer(goods, buttonId, isReversed) {
  let sortedGoods;

  switch (buttonId) {
    case SORT_ALPHABETICALLY:
      sortedGoods = [...goods].sort((good1, good2) =>
        good1.localeCompare(good2),
      );
      break;
    case SORT_BY_LENGTH:
      sortedGoods = [...goods].sort(
        (good1, good2) => good1.length - good2.length,
      );
      break;
    default:
      sortedGoods = goods;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortingType, setSortingType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const buttonClick = buttonId => {
    switch (buttonId) {
      case SORT_ALPHABETICALLY:
        setSortingType(SORT_ALPHABETICALLY);
        setIsReversed(false);
        break;
      case SORT_BY_LENGTH:
        setSortingType(SORT_BY_LENGTH);
        setIsReversed(false);
        break;
      case REVERSE_LIST:
        setIsReversed(!isReversed);
        break;
      case RESET:
        setSortingType(null);
        setIsReversed(false);
        break;
      default:
        break;
    }
  };

  const resetGoods = () => {
    setSortingType(null);
    setIsReversed(false);
  };

  const isDifferent = () => {
    return !visibleVegetables.every(
      (item, index) => item === goodsFromServer[index],
    );
  };

  const visibleVegetables = isReversed
    ? [...goodsFromServer].reverse()
    : [...goodsFromServer];

  const preparedGoods = sortingType
    ? getPreparedGoodsFromServer(visibleVegetables, sortingType, isReversed)
    : visibleVegetables;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => buttonClick(SORT_ALPHABETICALLY)}
          type="button"
          className={cn('button', {
            'is-info': sortingType === SORT_ALPHABETICALLY,
            'is-info is-light': sortingType !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => buttonClick(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', {
            'is-success': sortingType === SORT_BY_LENGTH,
            'is-success is-light': sortingType !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => buttonClick(REVERSE_LIST)}
          type="button"
          className={cn('button', {
            'is-warning': isReversed,
            'is-warning is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isDifferent() || isReversed || sortingType) && (
          <button
            onClick={resetGoods}
            type="button"
            className={cn('button', 'is-danger')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(vegetable => (
          <li key={vegetable} data-cy="Good">
            {vegetable}
          </li>
        ))}
      </ul>
    </div>
  );
};
