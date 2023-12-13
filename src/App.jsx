import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_BY_ABT = 'alphabetical';
const SORT_BY_LENGTH = 'length';
const SORT_BY_REVERS = 'reverse';

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

function getParameterGood(goods, visibleGoods) {
  let preparedGoods = [...goods];

  const sortGoods = preparedGoods.sort((good1, good2) => {
    switch (visibleGoods) {
      case SORT_BY_ABT:

        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:

        return good1.length - good2.length;
      case SORT_BY_REVERS:
        preparedGoods.reverse();

        return 0;
      default:
        return 0;
    }
  });

  if (visibleGoods === SORT_BY_REVERS) {
    preparedGoods = preparedGoods.reverse();
  }

  return sortGoods;
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState('');
  const sortField = getParameterGood(goodsFromServer, visibleGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setVisibleGoods(SORT_BY_ABT)}
          type="button"
          className={cn('button is-info',
            { 'is-light': visibleGoods !== SORT_BY_ABT })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setVisibleGoods(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': visibleGoods !== SORT_BY_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setVisibleGoods(SORT_BY_REVERS)}
          type="button"
          className={cn('button is-warning',
            { 'is-light': visibleGoods !== SORT_BY_REVERS })}
        >
          Reverse
        </button>

        {visibleGoods && (
          <button
            onClick={() => setVisibleGoods('')}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {sortField.map((good, index) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
