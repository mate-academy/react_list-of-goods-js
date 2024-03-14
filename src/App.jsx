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

const Sort = Object.freeze({
  ALPHABETICALLY: 'Sort alphabetically',
  BY_LENGTH: 'Sort by length',
});

const sortGoods = (goods, sortField, isReversed) => {
  const { ALPHABETICALLY, BY_LENGTH } = Sort;
  let sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case ALPHABETICALLY:
          return good1.localeCompare(good2);
        case BY_LENGTH:
          return good1.length - good2.length || good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = sortGoods(goodsFromServer, sortField, isReversed);
  const { ALPHABETICALLY, BY_LENGTH } = Sort;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== ALPHABETICALLY,
          })}
          onClick={() => setSortField(ALPHABETICALLY)}
        >
          {ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== BY_LENGTH,
          })}
          onClick={() => setSortField(BY_LENGTH)}
        >
          {BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(currentState => !currentState)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
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
