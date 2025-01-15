import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';
import cn from 'classnames';

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

const sortAlphabetical = 'name';
const sortLength = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  // Мемоизация отсортированного списка
  const sortedListGoods = useMemo(() => {
    let sortedGoods = [...goodsFromServer];

    if (sortField) {
      switch (sortField) {
        case sortAlphabetical:
          sortedGoods.sort((a, b) => a.localeCompare(b));
          break;
        case sortLength:
          sortedGoods.sort((a, b) => a.length - b.length);
          break;
        default:
          break;
      }
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sortField, isReversed]);

  const handleReverse = () => {
    setIsReversed((prevState) => !prevState);
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const makeSetSortField = (sortType) => {
    return () => setSortField(sortType);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={makeSetSortField(sortAlphabetical)} // Передаём результат вызова напрямую
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== sortAlphabetical,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={makeSetSortField(sortLength)} // Передаём результат вызова напрямую
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== sortLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedListGoods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
          ))}
      </ul>
    </div>
  );
};
