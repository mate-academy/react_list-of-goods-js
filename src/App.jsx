import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
import cn from 'classnames';

const SORT_ALPHABETICALLY = 'alpha';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';
const RESET = 'reset';

let previousReverse = false;

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

let previousGoods = [...goodsFromServer];

const getSortedGoods = (goods, sortMethod, isReverse) => {
  let newGoods = [...goods];
  const isReverseSwitched = isReverse !== previousReverse;

  if (isReverseSwitched) {
    previousReverse = isReverse;
  }

  switch (sortMethod) {
    case SORT_ALPHABETICALLY:
      newGoods = newGoods.sort((good1, good2) => (isReverse
        ? good2.localeCompare(good1)
        : good1.localeCompare(good2)));
      break;
    case SORT_BY_LENGTH:
      newGoods = isReverse
        ? newGoods.sort()
          .sort((good1, good2) => good1.length - good2.length).reverse()
        : newGoods.sort()
          .sort((good1, good2) => good1.length - good2.length);
      break;
    case RESET:
      newGoods = [...goodsFromServer];
      break;
    default:
      newGoods = isReverseSwitched ? newGoods.reverse() : newGoods;
  }

  return newGoods;
};

export const App = () => {
  const [selectedSort, setSelectedSort] = useState({
    sortMethod: '',
    isReverse: false,
  });
  const sortedGoods = getSortedGoods(
    previousGoods,
    selectedSort.sortMethod,
    selectedSort.isReverse,
  );

  previousGoods = sortedGoods;

  const handleOnClick = (event) => {
    if (event.target.name === selectedSort.sortMethod) {
      return;
    }

    if (event.target.name === REVERSE) {
      setSelectedSort({
        sortMethod:
          selectedSort.sortMethod === RESET ? '' : selectedSort.sortMethod,
        isReverse: !selectedSort.isReverse,
      });
    } else {
      setSelectedSort({
        sortMethod: event.target.name,
        isReverse: selectedSort.isReverse,
      });
    }

    if (event.target.name === RESET) {
      setSelectedSort({
        sortMethod: event.target.name,
        isReverse: false,
      });
    }
  };

  const hideReset = goodsFromServer.join('') === sortedGoods.join('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': selectedSort.sortMethod === SORT_ALPHABETICALLY,
            'button is-info is-light':
              selectedSort.sortMethod !== SORT_ALPHABETICALLY,
          })}
          onClick={handleOnClick}
          name={SORT_ALPHABETICALLY}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': selectedSort.sortMethod === SORT_BY_LENGTH,
            'button is-success is-light':
              selectedSort.sortMethod !== SORT_BY_LENGTH,
          })}
          onClick={handleOnClick}
          name={SORT_BY_LENGTH}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': selectedSort.isReverse,
            'button is-warning is-light': !selectedSort.isReverse,
          })}
          onClick={handleOnClick}
          name={REVERSE}
        >
          Reverse
        </button>

        {!hideReset && (
          <button
            type="button"
            className={cn({
              'button is-danger': selectedSort.sortMethod === RESET,
              'button is-danger is-light': selectedSort.sortMethod !== RESET,
            })}
            onClick={handleOnClick}
            name={RESET}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
