import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';

function getSortedGoods(goods, { sortMethod, reverseMethod }) {
  const sortedGoods = [...goods];

  if (reverseMethod && sortMethod === SORT_ALPHABETICALLY) {
    return sortedGoods
      .sort((good1, good2) => good1.localeCompare(good2))
      .reverse();
  }

  if (reverseMethod && sortMethod === SORT_BY_LENGTH) {
    return sortedGoods
      .sort((good1, good2) => good1.length - good2.length)
      .reverse();
  }

  if (reverseMethod) {
    return sortedGoods.reverse();
  }

  if (sortMethod) {
    sortedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [reverseMethod, setreverseMethod] = useState('');
  const visibleGoods = getSortedGoods(
    goodsFromServer,
    {
      sortMethod,
      reverseMethod,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortMethod !== SORT_ALPHABETICALLY },
          )}
          onClick={() => setSortMethod(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortMethod !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortMethod(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        {reverseMethod ? (
          <button
            type="button"
            className={cn(
              'button',
              'is-warning',
              { 'is-light': reverseMethod !== REVERSE },
            )}
            onClick={() => setreverseMethod('')}
          >
            Reverse
          </button>
        ) : (
          <button
            type="button"
            className={cn(
              'button',
              'is-warning',
              { 'is-light': reverseMethod !== REVERSE },
            )}
            onClick={() => setreverseMethod(REVERSE)}
          >
            Reverse
          </button>
        )}

        {(sortMethod || reverseMethod) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortMethod('') || setreverseMethod('')}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </div>
  );
};
