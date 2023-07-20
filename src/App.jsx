import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const SORT_BY = {
  ALPHABETICALLY: 'ALPHABETICALLY',
  LENGTH: 'LENGTH',
};

function sortGoods(goods, { sortField, isReversed }) {
  const handledGoods = [...goods];

  switch (sortField) {
    case SORT_BY.ALPHABETICALLY:
      handledGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;

    case SORT_BY.LENGTH:
      handledGoods.sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    handledGoods.reverse();
  }

  return handledGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = sortGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            sortField !== SORT_BY.ALPHABETICALLY && 'is-light',
          )}
          onClick={() => setSortField(SORT_BY.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            sortField !== SORT_BY.LENGTH && 'is-light',
          )}
          onClick={() => setSortField(SORT_BY.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            !isReversed && 'is-light',
          )}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortField('');
            }}
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
