import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_ALPHABETICALLY = 'alp';
const SORT_BY_LENGTH = 'lng';

function sortGoods(goods, { sortCondition, reverseGoods }) {
  const sortedGoods = [...goods];

  if (sortCondition) {
    sortedGoods.sort((good1, good2) => {
      switch (sortCondition) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortCondition, setSortCondition] = useState('');
  const [reverseGoods, setReverseGoods] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, {
    sortCondition,
    reverseGoods,
  });

  const isResetButtonIsVisible = sortCondition || reverseGoods;

  function handleReverse() {
    setReverseGoods(prev => !prev);
  }

  function handleReset() {
    setSortCondition('');
    setReverseGoods(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortCondition(SORT_ALPHABETICALLY)}
          className={classNames('button is-warning', {
            'is-light': sortCondition !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortCondition(SORT_BY_LENGTH)}
          className={classNames('button is-success', {
            'is-light': sortCondition !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={classNames('button is-warning', {
            'is-light': !reverseGoods,
          })}
        >
          Reverse
        </button>

        {isResetButtonIsVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
