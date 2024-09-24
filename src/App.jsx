import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

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

const ALPHABETICALLY = 'alphabetically';
const LENGTH = 'length';

const preparedGoods = (goods, sortField, reverse) => {
  const copyOfGoods = [...goods];

  if (sortField) {
    copyOfGoods.sort((good1, good2) => {
      switch (sortField) {
        case ALPHABETICALLY:
          return good1.localeCompare(good2);
        case LENGTH:
          return good1.length - good2.length;
        default:
          return copyOfGoods;
      }
    });
  }

  if (reverse) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
};

export const App = () => {
  const [goods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const resetFilters = () => {
    setIsReverse(false);
    setSortField('');
  };

  const visibleGoods = preparedGoods(goods, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-info': sortField === ALPHABETICALLY,
            'is-light': sortField !== ALPHABETICALLY,
          })}
          onClick={() => setSortField(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-success': sortField === LENGTH,
            'is-light': sortField !== LENGTH,
          })}
          onClick={() => setSortField(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': isReverse,
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>
        {sortField !== '' || isReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilters}
          >
            Reset
          </button>
        ) : (
          ''
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
