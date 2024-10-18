import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useVisibleGoods } from './hooks';

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

function constructKeyForGood({ good, index }) {
  return `${index}_${good}`;
}

export const App = () => {
  const {
    sortButton,
    visibleGoods,
    sortAlphabetically,
    sortByLength,
    reverseSort,
    resetSort,
  } = useVisibleGoods(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-active': sortButton.alphabetically,
            'is-light': !sortButton.alphabetically,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-active': sortButton.length,
            'is-light': !sortButton.length,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-active': sortButton.reverse,
            'is-light': !sortButton.reverse,
          })}
          onClick={reverseSort}
        >
          Reverse
        </button>

        {sortButton.reset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          <li data-cy="Good" key={constructKeyForGood({ good, index })}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
