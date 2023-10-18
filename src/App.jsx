import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getSortedGoods(goods, sortField, reversed) {
  let sortedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_ALPHABETICALLY:
        sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SORT_BY_LENGTH:
        sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
        break;

      default:
        return 0;
    }
  }

  if (reversed) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');

  const [visibleGoods, setVisibleGoods] = useState(
    getSortedGoods(
      goodsFromServer, sortField, reversed,
    ),
  );

  function handleReverse() {
    setReversed(!reversed);
    setVisibleGoods(getSortedGoods(goodsFromServer, sortField, !reversed));
  }

  function handleSort(field) {
    setSortField(field);
    setVisibleGoods(getSortedGoods(goodsFromServer, field, reversed));
  }

  function handleReset() {
    setSortField('');
    setReversed(false);
    setVisibleGoods(goodsFromServer);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SORT_ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse()}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <ul>
          <li key={good} data-cy="Good">
            {good}
          </li>
        </ul>
      ))}
    </div>
  );
};
