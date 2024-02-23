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

function getPrepareGoods(goods, sortField, reverseField) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'sortAlphabetically':
          return good1.localeCompare(good2);

        case 'sortByLenght':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [reverseField, setreverseField] = useState(false);
  const visibleGoods = getPrepareGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );
  const handlerSortByLenght = () => setsortField('sortByLenght');
  const sortAlphabetically = () => setsortField('sortAlphabetically');
  const isReversed = () => {
    if (reverseField) {
      setreverseField(false);
    } else {
      setreverseField(true);
    }
  };

  const clearGood = () => {
    setsortField('');
    setreverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'sortAlphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handlerSortByLenght}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'sortByLenght',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={isReversed}
          type="button"
          className={cn('button is-info', {
            'is-light': reverseField === false,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={clearGood}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
