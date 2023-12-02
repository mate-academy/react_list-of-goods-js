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

const ALPHABETICALLY = 'Sort alphabetically';
const LENGTH = 'Sort by length';

function getPreperedGoods(
  goods,
  {
    sortField,
    isReversed,
  },
) {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case ALPHABETICALLY:
          return good1.localeCompare(good2);

        case LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    { sortField,
      isReversed },
  );

  const handlerReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(ALPHABETICALLY)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            onClick={handlerReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
