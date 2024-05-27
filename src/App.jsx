import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList/GoodList';

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

export const BY_ALPHABETICALLY = 'alphabetically';
export const BY_LENGTH = 'length';
export const BY_REVERSE = 'reverse';

export function getSortList(goods, sortField, reverse) {
  const sortGoods = [...goods];

  switch (sortField) {
    case BY_ALPHABETICALLY:
      sortGoods.sort();
      break;
    case BY_LENGTH:
      sortGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (reverse) {
    sortGoods.reverse();
  }

  return sortGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [reverse, setReverse] = useState(false);

  const handleSort = field => {
    if (field === BY_REVERSE) {
      setReverse(prevReverse => !prevReverse);
    } else {
      setSortField(field);
    }
  };

  const handleReset = () => {
    setSortField(null);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== BY_ALPHABETICALLY,
          })}
          onClick={() => handleSort(BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== BY_LENGTH,
          })}
          onClick={() => handleSort(BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reverse })}
          onClick={() => handleSort(BY_REVERSE)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={getSortList(goodsFromServer, sortField, reverse)} />
    </div>
  );
};
