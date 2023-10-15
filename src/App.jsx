import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
import cn from 'classnames';

const SORT_ALPHABETICALLY = 'alpha';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';
const RESET = 'reset';

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

const getSortedGoods = (goods, sortMethod, isReversed) => {
  let newGoods = [...goods];

  switch (sortMethod) {
    case SORT_ALPHABETICALLY:
      newGoods = newGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_BY_LENGTH:
      newGoods.sort().sort((good1, good2) => good1.length - good2.length);
      break;
    case RESET:
      newGoods = [...goodsFromServer];
      break;
    default:
      return isReversed ? newGoods.reverse() : newGoods;
  }

  return isReversed ? newGoods.reverse() : newGoods;
};

export const App = () => {
  const [selectedSort, setSelectedSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, selectedSort, isReversed);

  const isResetHidden = selectedSort === '' && !isReversed;

  const handleSortChange = (event) => {
    if (event.target.name === selectedSort) {
      return;
    }

    if (event.target.name === RESET) {
      setSelectedSort('');
      setIsReversed(false);

      return;
    }

    setSelectedSort(event.target.name);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': selectedSort === SORT_ALPHABETICALLY,
            'button is-info is-light': selectedSort !== SORT_ALPHABETICALLY,
          })}
          onClick={handleSortChange}
          name={SORT_ALPHABETICALLY}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': selectedSort === SORT_BY_LENGTH,
            'button is-success is-light': selectedSort !== SORT_BY_LENGTH,
          })}
          onClick={handleSortChange}
          name={SORT_BY_LENGTH}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': isReversed,
            'button is-warning is-light': !isReversed,
          })}
          onClick={handleReverse}
          name={REVERSE}
        >
          Reverse
        </button>

        {!isResetHidden && (
          <button
            type="button"
            className={cn({
              'button is-danger': selectedSort === RESET,
              'button is-danger is-light': selectedSort !== RESET,
            })}
            onClick={handleSortChange}
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
